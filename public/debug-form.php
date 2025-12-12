<?php
/**
 * Debug endpoint for form submissions
 * This helps diagnose what data is being received
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

$debugInfo = [
    'method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
    'raw_input' => file_get_contents('php://input'),
    'post_data' => $_POST,
    'get_data' => $_GET,
    'headers' => getallheaders(),
];

// Try to parse JSON
$input = file_get_contents('php://input');
$jsonData = null;
if (!empty($input)) {
    $jsonData = json_decode($input, true);
    $debugInfo['json_parsed'] = $jsonData;
    $debugInfo['json_error'] = json_last_error() !== JSON_ERROR_NONE ? json_last_error_msg() : null;
}

echo json_encode($debugInfo, JSON_PRETTY_PRINT);
?>

