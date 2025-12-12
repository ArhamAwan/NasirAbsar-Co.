<?php
/**
 * Consultation Form Email Handler
 * Sends form submissions to contact@nasirabsar.com
 */

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Debug: Log the actual request method received
$actualMethod = $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN';
$requestUri = $_SERVER['REQUEST_URI'] ?? 'UNKNOWN';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false, 
        'error' => 'Method not allowed. Only POST requests are accepted.',
        'debug' => [
            'received_method' => $actualMethod,
            'request_uri' => $requestUri,
            'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
            'content_length' => $_SERVER['CONTENT_LENGTH'] ?? 'not set'
        ]
    ]);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Fallback to POST data if JSON parsing fails
if (!$data) {
    $data = $_POST;
}

// Validate required fields
$required = ['name', 'email', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
        exit;
    }
}

// Sanitize input
$name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '';
$service = isset($data['service']) ? htmlspecialchars(trim($data['service']), ENT_QUOTES, 'UTF-8') : 'Not specified';
$message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// Email configuration
$to = 'contact@nasirabsar.com';
$subject = 'New Consultation Request from ' . $name;

// Create email body (HTML format)
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1E90FF; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; margin-bottom: 5px; display: block; }
        .value { color: #333; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Consultation Request</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Full Name:</span>
                <span class='value'>{$name}</span>
            </div>
            <div class='field'>
                <span class='label'>Email Address:</span>
                <span class='value'>{$email}</span>
            </div>
            " . ($phone ? "
            <div class='field'>
                <span class='label'>Phone Number:</span>
                <span class='value'>{$phone}</span>
            </div>
            " : "") . "
            <div class='field'>
                <span class='label'>Service Interested In:</span>
                <span class='value'>{$service}</span>
            </div>
            <div class='field'>
                <span class='label'>Message:</span>
                <div class='value' style='white-space: pre-wrap;'>{$message}</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the consultation form on nasirabsar.com</p>
            <p>Submitted on: " . date('F j, Y, g:i a') . "</p>
        </div>
    </div>
</body>
</html>
";

// Plain text version
$textBody = "
New Consultation Request
=======================

Full Name: {$name}
Email Address: {$email}
" . ($phone ? "Phone Number: {$phone}\n" : "") . "
Service Interested In: {$service}

Message:
{$message}

---
Submitted on: " . date('F j, Y, g:i a') . "
";

// Email headers (same pattern as test-email.php)
$headers = "From: noreply@nasirabsar.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
$headers .= "\r\nMIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Try to send email using PHPMailer if available (same as test-email.php)
$mailSent = false;

if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'localhost';
        $mail->SMTPAuth = false;
        $mail->Port = 25;
        
        $mail->setFrom('noreply@nasirabsar.com', 'Nasir Absar Website');
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);
        
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $emailBody;
        $mail->AltBody = $textBody;
        
        if ($mail->send()) {
            $mailSent = true;
        }
    } catch (Exception $e) {
        // Fall through to mail() function
    }
}

// Fallback to native mail() function (same as test-email.php)
if (!$mailSent && function_exists('mail')) {
    $mailSent = @mail($to, $subject, $emailBody, $headers);
}

if ($mailSent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
?>

