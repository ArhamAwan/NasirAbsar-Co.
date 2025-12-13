<?php
/**
 * Test script for reviews API
 * This helps debug issues with the reviews.php endpoint
 */

header('Content-Type: application/json');

// Test data directory
$baseDir = dirname(__DIR__) . '/data';
$pendingFile = $baseDir . '/pending-reviews.json';

$results = [
    'baseDir' => $baseDir,
    'baseDirExists' => is_dir($baseDir),
    'baseDirWritable' => is_writable($baseDir),
    'pendingFile' => $pendingFile,
    'pendingFileExists' => file_exists($pendingFile),
    'pendingFileReadable' => is_readable($pendingFile),
    'pendingFileWritable' => is_writable($pendingFile),
    'phpVersion' => phpversion(),
    'errorReporting' => error_reporting(),
    'displayErrors' => ini_get('display_errors'),
    'logErrors' => ini_get('log_errors'),
];

// Try to read the file
if (file_exists($pendingFile)) {
    $content = file_get_contents($pendingFile);
    $results['fileContent'] = $content;
    $results['fileSize'] = filesize($pendingFile);
    $json = json_decode($content, true);
    $results['jsonValid'] = json_last_error() === JSON_ERROR_NONE;
    $results['jsonError'] = json_last_error() !== JSON_ERROR_NONE ? json_last_error_msg() : null;
    $results['decodedData'] = $json;
}

// Try to write to the file
$testData = ['test' => 'data'];
$writeResult = file_put_contents($pendingFile, json_encode($testData));
$results['writeTest'] = $writeResult !== false;
$results['writeBytes'] = $writeResult;

// Restore original content if it existed
if (isset($content)) {
    file_put_contents($pendingFile, $content);
}

echo json_encode($results, JSON_PRETTY_PRINT);

