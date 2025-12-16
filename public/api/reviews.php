<?php
/**
 * Reviews API Endpoint
 * Handles review submission, fetching, approval, and rejection
 */

// Set CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

// Handle CORS preflight
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$path = $requestUri ? parse_url($requestUri, PHP_URL_PATH) : '';

// Data directory
$dataDir = __DIR__ . '/../data';
$pendingFile = $dataDir . '/pending-reviews.json';
$approvedFile = $dataDir . '/approved-reviews.json';

// Ensure data directory exists
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Initialize JSON files if they don't exist
if (!file_exists($pendingFile)) {
    file_put_contents($pendingFile, '[]');
}
if (!file_exists($approvedFile)) {
    file_put_contents($approvedFile, '[]');
}

// Helper function to read JSON file
function readJsonFile($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    return $data ?: [];
}

// Helper function to write JSON file
function writeJsonFile($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Helper function to get Authorization header from various sources
function getAuthHeader() {
    // Method 1: Check standard location
    if (isset($_SERVER['HTTP_AUTHORIZATION']) && !empty($_SERVER['HTTP_AUTHORIZATION'])) {
        return $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    // Method 2: Check redirect location (some servers)
    if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) && !empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    
    // Method 3: Check using apache_request_headers if available (most reliable)
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization']) && !empty($headers['Authorization'])) {
            return $headers['Authorization'];
        }
        if (isset($headers['authorization']) && !empty($headers['authorization'])) {
            return $headers['authorization'];
        }
    }
    
    // Method 4: Try getallheaders() as fallback
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if ($headers) {
            foreach ($headers as $key => $value) {
                if (strtolower($key) === 'authorization' && !empty($value)) {
                    return $value;
                }
            }
        }
    }
    
    // Method 5: Try reading from input stream (for some proxy configurations)
    $input = file_get_contents('php://input');
    if (!empty($input)) {
        // This won't work for Authorization header, but keeping for reference
    }
    
    return '';
}

// Handle POST request for submitting a review
if ($method === 'POST' && !strpos($path, '/approve') && !strpos($path, '/reject') && !strpos($path, '/delete')) {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
        exit;
    }
    
    // Validate required fields
    $required = ['name', 'review'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
            exit;
        }
    }
    
    // Sanitize input
    $review = [
        'id' => uniqid('review_', true),
        'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
        'title' => isset($data['title']) ? htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8') : '',
        'review' => htmlspecialchars(trim($data['review']), ENT_QUOTES, 'UTF-8'),
        'submittedAt' => date('Y-m-d H:i:s')
    ];
    
    // Read pending reviews
    $pending = readJsonFile($pendingFile);
    $pending[] = $review;
    
    // Save to pending reviews
    if (writeJsonFile($pendingFile, $pending)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Review submitted successfully. It will be reviewed before being published.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save review']);
    }
    exit;
}

// Handle GET request for fetching reviews
if ($method === 'GET') {
    $status = $_GET['status'] ?? 'approved';
    
    if ($status === 'pending') {
        $reviews = readJsonFile($pendingFile);
    } else {
        $reviews = readJsonFile($approvedFile);
    }
    
    http_response_code(200);
    echo json_encode($reviews);
    exit;
}

// Handle POST request for approving a review
if ($method === 'POST' && strpos($path, '/approve') !== false) {
    // Debug: Log what we're receiving
    error_log('Approve request - HTTP_AUTHORIZATION: ' . ($_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET'));
    
    $authHeader = getAuthHeader();
    error_log('Approve request - getAuthHeader() result: ' . ($authHeader ?: 'EMPTY'));
    
    if (empty($authHeader)) {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'error' => 'Unauthorized',
            'debug' => [
                'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET',
                'REDIRECT_HTTP_AUTHORIZATION' => $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 'NOT SET',
                'apache_request_headers' => function_exists('apache_request_headers') ? apache_request_headers() : 'NOT AVAILABLE'
            ]
        ]);
        exit;
    }
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Review ID is required']);
        exit;
    }
    
    $reviewId = $data['id'];
    
    // Read pending reviews
    $pending = readJsonFile($pendingFile);
    $approved = readJsonFile($approvedFile);
    
    // Find and move review
    $reviewIndex = -1;
    foreach ($pending as $index => $review) {
        if ($review['id'] === $reviewId) {
            $reviewIndex = $index;
            break;
        }
    }
    
    if ($reviewIndex === -1) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Review not found']);
        exit;
    }
    
    $review = $pending[$reviewIndex];
    $review['approvedAt'] = date('Y-m-d H:i:s');
    $review['approvedBy'] = 'admin';
    
    // Remove from pending
    array_splice($pending, $reviewIndex, 1);
    
    // Add to approved
    $approved[] = $review;
    
    // Save both files
    if (writeJsonFile($pendingFile, $pending) && writeJsonFile($approvedFile, $approved)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Review approved successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to approve review']);
    }
    exit;
}

// Handle POST request for rejecting a review
if ($method === 'POST' && strpos($path, '/reject') !== false) {
    // Debug: Log what we're receiving
    $debugInfo = [
        'REQUEST_METHOD' => $method,
        'REQUEST_URI' => $_SERVER['REQUEST_URI'] ?? 'N/A',
        'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET',
        'REDIRECT_HTTP_AUTHORIZATION' => $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 'NOT SET',
    ];
    
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $debugInfo['apache_request_headers'] = $headers;
    }
    
    if (function_exists('getallheaders')) {
        $allHeaders = getallheaders();
        $debugInfo['getallheaders'] = $allHeaders;
    }
    
    error_log('Reject request debug: ' . json_encode($debugInfo));
    
    $authHeader = getAuthHeader();
    error_log('Reject request - getAuthHeader() result: ' . ($authHeader ?: 'EMPTY'));
    
    if (empty($authHeader)) {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'error' => 'Unauthorized',
            'debug' => $debugInfo
        ]);
        exit;
    }
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Review ID is required']);
        exit;
    }
    
    $reviewId = $data['id'];
    
    // Read pending reviews
    $pending = readJsonFile($pendingFile);
    
    // Find and remove review
    $reviewIndex = -1;
    foreach ($pending as $index => $review) {
        if ($review['id'] === $reviewId) {
            $reviewIndex = $index;
            break;
        }
    }
    
    if ($reviewIndex === -1) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Review not found']);
        exit;
    }
    
    // Remove from pending
    array_splice($pending, $reviewIndex, 1);
    
    // Save pending reviews
    if (writeJsonFile($pendingFile, $pending)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Review rejected successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to reject review']);
    }
    exit;
}

// Handle POST request for deleting a review
if ($method === 'POST' && strpos($path, '/delete') !== false) {
    // Debug: Log what we're receiving
    error_log('Delete request - HTTP_AUTHORIZATION: ' . ($_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET'));
    
    $authHeader = getAuthHeader();
    error_log('Delete request - getAuthHeader() result: ' . ($authHeader ?: 'EMPTY'));
    
    if (empty($authHeader)) {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'error' => 'Unauthorized',
            'debug' => [
                'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET',
                'REDIRECT_HTTP_AUTHORIZATION' => $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 'NOT SET',
                'apache_request_headers' => function_exists('apache_request_headers') ? apache_request_headers() : 'NOT AVAILABLE'
            ]
        ]);
        exit;
    }
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Review ID is required']);
        exit;
    }
    
    $reviewId = $data['id'];
    $from = $data['from'] ?? 'approved'; // 'pending' or 'approved'
    
    if ($from === 'pending') {
        $reviews = readJsonFile($pendingFile);
    } else {
        $reviews = readJsonFile($approvedFile);
    }
    
    // Find and remove review
    $reviewIndex = -1;
    foreach ($reviews as $index => $review) {
        if ($review['id'] === $reviewId) {
            $reviewIndex = $index;
            break;
        }
    }
    
    if ($reviewIndex === -1) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Review not found']);
        exit;
    }
    
    // Remove review
    array_splice($reviews, $reviewIndex, 1);
    
    // Save reviews
    $file = $from === 'pending' ? $pendingFile : $approvedFile;
    if (writeJsonFile($file, $reviews)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Review deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to delete review']);
    }
    exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
?>

