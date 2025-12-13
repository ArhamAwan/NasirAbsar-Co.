<?php
/**
 * Reviews API Handler
 * Handles review submission, fetching, approval, and rejection
 */

// Set headers FIRST before any output or redirects
// This must be done before any output, including whitespace
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json');

// Handle CORS preflight (OPTIONS request) - MUST be handled first
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Start output buffering to catch any errors
ob_start();

// Set error handler to catch fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        ob_clean();
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Internal server error',
            'details' => $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
        exit;
    }
});

// Define file paths - use __DIR__ to get current directory (public/api)
// Then go up one level to public, then into data
$baseDir = dirname(__DIR__) . '/data';
$pendingFile = $baseDir . '/pending-reviews.json';
$approvedFile = $baseDir . '/approved-reviews.json';
$rejectedFile = $baseDir . '/rejected-reviews.json';

// Ensure data directory exists
if (!is_dir($baseDir)) {
    if (!mkdir($baseDir, 0755, true)) {
        error_log("Failed to create data directory: " . $baseDir);
    }
}

// Enable error reporting for debugging (remove in production if needed)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set error handler for non-fatal errors
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    // Log the error but don't stop execution
    error_log("PHP Error [$errno]: $errstr in $errfile on line $errline");
    return false; // Let PHP handle the error normally
});

// Helper function to read JSON file
function readJsonFile($file) {
    if (!file_exists($file)) {
        // Create empty file if it doesn't exist
        $result = file_put_contents($file, '[]');
        if ($result === false) {
            error_log("Failed to create file: " . $file);
        }
        return [];
    }
    $content = file_get_contents($file);
    if ($content === false) {
        error_log("Failed to read file: " . $file);
        return [];
    }
    // Handle empty file
    $content = trim($content);
    if (empty($content)) {
        return [];
    }
    $data = json_decode($content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error in file $file: " . json_last_error_msg() . " Content: " . substr($content, 0, 100));
        // Try to fix corrupted JSON by resetting to empty array
        file_put_contents($file, '[]');
        return [];
    }
    return is_array($data) ? $data : [];
}

// Helper function to write JSON file
function writeJsonFile($file, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        error_log("JSON encode error: " . json_last_error_msg());
        return false;
    }
    $result = file_put_contents($file, $json);
    if ($result === false) {
        error_log("Failed to write file: " . $file);
    }
    return $result !== false;
}

// Helper function to generate unique ID
function generateId() {
    return uniqid('review_', true);
}

// Route handling
$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
$requestUri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Get action from path (e.g., /api/reviews.php/approve or /api/reviews/approve)
$action = null;
// Check if approve or reject is in the path
if (strpos($path, 'approve') !== false) {
    $action = 'approve';
} elseif (strpos($path, 'reject') !== false) {
    $action = 'reject';
} elseif (isset($pathParts[2])) {
    $action = $pathParts[2];
}

// GET /api/reviews?status=pending|approved
if ($method === 'GET') {
    try {
        $status = isset($_GET['status']) ? $_GET['status'] : 'approved';
        
        if ($status === 'pending') {
            $reviews = readJsonFile($pendingFile);
            echo json_encode(['success' => true, 'reviews' => $reviews]);
        } elseif ($status === 'approved') {
            $reviews = readJsonFile($approvedFile);
            echo json_encode(['success' => true, 'reviews' => $reviews]);
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid status. Use "pending" or "approved"']);
        }
    } catch (Exception $e) {
        error_log("Error in GET request: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Internal server error', 'details' => $e->getMessage()]);
    }
    exit;
}

// POST /api/reviews - Submit new review
if ($method === 'POST' && !$action) {
    try {
        $input = file_get_contents('php://input');
        if ($input === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Failed to read input data']);
            exit;
        }
        
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid JSON data: ' . json_last_error_msg()]);
            exit;
        }
        
        if (!$data || !is_array($data)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid data format']);
            exit;
        }
        
        // Validate required fields
        $required = ['name', 'title', 'review'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || trim($data[$field]) === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
                exit;
            }
        }
        
        // Sanitize input
        $review = [
            'id' => generateId(),
            'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
            'title' => htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8'),
            'review' => htmlspecialchars(trim($data['review']), ENT_QUOTES, 'UTF-8'),
            'submittedAt' => date('Y-m-d H:i:s')
        ];
        
        // Check if data directory is writable
        if (!is_writable($baseDir) && !is_writable(dirname($pendingFile))) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Data directory is not writable. Please check permissions.']);
            exit;
        }
        
        // Read existing pending reviews
        $pendingReviews = readJsonFile($pendingFile);
        if (!is_array($pendingReviews)) {
            $pendingReviews = [];
        }
        
        // Add new review
        $pendingReviews[] = $review;
        
        // Save to file
        $writeResult = writeJsonFile($pendingFile, $pendingReviews);
        if ($writeResult) {
            ob_end_clean(); // Clear any output before sending response
            echo json_encode(['success' => true, 'message' => 'Review submitted successfully. It will be reviewed by an administrator.']);
        } else {
            http_response_code(500);
            ob_end_clean();
            echo json_encode(['success' => false, 'error' => 'Failed to save review. Please check file permissions.']);
        }
    } catch (Exception $e) {
        error_log("Error in POST request: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Internal server error', 'details' => $e->getMessage()]);
    }
    exit;
}

// POST /api/reviews/approve - Approve a review
if ($method === 'POST' && $action === 'approve') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Review ID is required']);
        exit;
    }
    
    $reviewId = $data['id'];
    
    // Read pending reviews
    $pendingReviews = readJsonFile($pendingFile);
    
    // Find and remove the review
    $reviewToApprove = null;
    $pendingReviews = array_filter($pendingReviews, function($review) use ($reviewId, &$reviewToApprove) {
        if ($review['id'] === $reviewId) {
            $reviewToApprove = $review;
            return false;
        }
        return true;
    });
    
    if (!$reviewToApprove) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Review not found']);
        exit;
    }
    
    // Add approval metadata
    $reviewToApprove['approvedAt'] = date('Y-m-d H:i:s');
    $reviewToApprove['approvedBy'] = 'admin';
    
    // Read approved reviews
    $approvedReviews = readJsonFile($approvedFile);
    
    // Add to approved reviews
    $approvedReviews[] = $reviewToApprove;
    
    // Save both files
    if (writeJsonFile($pendingFile, array_values($pendingReviews)) && writeJsonFile($approvedFile, $approvedReviews)) {
        echo json_encode(['success' => true, 'message' => 'Review approved successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to approve review']);
    }
    exit;
}

// POST /api/reviews/reject - Reject a review
if ($method === 'POST' && $action === 'reject') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Review ID is required']);
        exit;
    }
    
    $reviewId = $data['id'];
    
    // Read pending reviews
    $pendingReviews = readJsonFile($pendingFile);
    
    // Find and remove the review
    $reviewToReject = null;
    $pendingReviews = array_filter($pendingReviews, function($review) use ($reviewId, &$reviewToReject) {
        if ($review['id'] === $reviewId) {
            $reviewToReject = $review;
            return false;
        }
        return true;
    });
    
    if (!$reviewToReject) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Review not found']);
        exit;
    }
    
    // Add rejection metadata
    $reviewToReject['rejectedAt'] = date('Y-m-d H:i:s');
    $reviewToReject['rejectedBy'] = 'admin';
    
    // Optionally save to rejected reviews
    $rejectedReviews = readJsonFile($rejectedFile);
    $rejectedReviews[] = $reviewToReject;
    writeJsonFile($rejectedFile, $rejectedReviews);
    
    // Save pending reviews (without the rejected one)
    if (writeJsonFile($pendingFile, array_values($pendingReviews))) {
        echo json_encode(['success' => true, 'message' => 'Review rejected successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to reject review']);
    }
    exit;
}

// POST /api/reviews/delete - Delete a review (from pending or approved)
if ($method === 'POST' && $action === 'delete') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['id']) || !isset($data['status'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Review ID and status are required']);
        exit;
    }
    
    $reviewId = $data['id'];
    $status = $data['status']; // 'pending' or 'approved'
    
    if ($status === 'pending') {
        // Delete from pending reviews
        $pendingReviews = readJsonFile($pendingFile);
        $pendingReviews = array_filter($pendingReviews, function($review) use ($reviewId) {
            return $review['id'] !== $reviewId;
        });
        
        if (writeJsonFile($pendingFile, array_values($pendingReviews))) {
            echo json_encode(['success' => true, 'message' => 'Review deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to delete review']);
        }
    } elseif ($status === 'approved') {
        // Delete from approved reviews
        $approvedReviews = readJsonFile($approvedFile);
        $approvedReviews = array_filter($approvedReviews, function($review) use ($reviewId) {
            return $review['id'] !== $reviewId;
        });
        
        if (writeJsonFile($approvedFile, array_values($approvedReviews))) {
            echo json_encode(['success' => true, 'message' => 'Review deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to delete review']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid status. Use "pending" or "approved"']);
    }
    exit;
}

// Method not allowed
ob_end_clean();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed', 'method' => $method, 'action' => $action]);

