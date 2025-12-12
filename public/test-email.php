<?php
/**
 * Email Test Script
 * Use this to test if email sending is working on your server
 * Access: https://nasirabsar.com/test-email.php
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Email Test - Nasir Absar</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .test-section { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; margin: 10px 0; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>Email Configuration Test</h1>
    
    <?php
    // Server Information
    echo '<div class="test-section">';
    echo '<h2>Server Information</h2>';
    echo '<p><strong>PHP Version:</strong> ' . phpversion() . '</p>';
    echo '<p><strong>Server:</strong> ' . $_SERVER['SERVER_SOFTWARE'] . '</p>';
    echo '<p><strong>mail() function available:</strong> ' . (function_exists('mail') ? 'YES ✓' : 'NO ✗') . '</p>';
    echo '<p><strong>PHPMailer available:</strong> ' . (class_exists('PHPMailer\\PHPMailer\\PHPMailer') ? 'YES ✓' : 'NO ✗') . '</p>';
    echo '</div>';
    
    // Test email sending
    if (isset($_POST['test_email'])) {
        $testEmail = $_POST['test_email'] ?? 'contact@nasirabsar.com';
        $testSubject = 'Test Email from ' . $_SERVER['HTTP_HOST'];
        $testMessage = 'This is a test email sent from ' . $_SERVER['HTTP_HOST'] . ' on ' . date('Y-m-d H:i:s');
        
        echo '<div class="test-section">';
        echo '<h2>Test Email Results</h2>';
        
        $mailSent = false;
        $errorDetails = [];
        
        // Try PHPMailer first
        if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
            try {
                $mail = new PHPMailer\PHPMailer\PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'localhost';
                $mail->SMTPAuth = false;
                $mail->Port = 25;
                $mail->SMTPDebug = 2;
                $mail->Debugoutput = function($str, $level) use (&$errorDetails) {
                    $errorDetails[] = htmlspecialchars($str);
                };
                
                $mail->setFrom('noreply@nasirabsar.com', 'Test Script');
                $mail->addAddress($testEmail);
                $mail->Subject = $testSubject;
                $mail->Body = $testMessage;
                $mail->isHTML(false);
                
                if ($mail->send()) {
                    echo '<div class="success">✓ Email sent successfully using PHPMailer!</div>';
                    $mailSent = true;
                }
            } catch (Exception $e) {
                echo '<div class="error">✗ PHPMailer Error: ' . htmlspecialchars($mail->ErrorInfo) . '</div>';
                $errorDetails[] = 'Exception: ' . $e->getMessage();
            }
        }
        
        // Try native mail() if PHPMailer failed
        if (!$mailSent && function_exists('mail')) {
            $headers = "From: noreply@nasirabsar.com\r\n";
            $headers .= "Reply-To: noreply@nasirabsar.com\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion();
            
            if (@mail($testEmail, $testSubject, $testMessage, $headers)) {
                echo '<div class="success">✓ Email sent successfully using mail() function!</div>';
                $mailSent = true;
            } else {
                $lastError = error_get_last();
                echo '<div class="error">✗ mail() function returned false</div>';
                if ($lastError) {
                    $errorDetails[] = $lastError['message'];
                }
            }
        }
        
        if (!$mailSent) {
            echo '<div class="error">✗ Failed to send email. Check error details below.</div>';
        }
        
        if (!empty($errorDetails)) {
            echo '<h3>Debug Information:</h3>';
            echo '<pre>' . implode("\n", $errorDetails) . '</pre>';
        }
        
        echo '</div>';
    }
    
    // Check mail configuration
    echo '<div class="test-section">';
    echo '<h2>Mail Configuration</h2>';
    $sendmailPath = ini_get('sendmail_path');
    echo '<p><strong>sendmail_path:</strong> ' . ($sendmailPath ?: 'Not set') . '</p>';
    
    $smtp = ini_get('SMTP');
    $smtpPort = ini_get('smtp_port');
    echo '<p><strong>SMTP:</strong> ' . ($smtp ?: 'Not set') . '</p>';
    echo '<p><strong>SMTP Port:</strong> ' . ($smtpPort ?: 'Not set') . '</p>';
    echo '</div>';
    
    // Test form
    echo '<div class="test-section">';
    echo '<h2>Send Test Email</h2>';
    echo '<form method="POST">';
    echo '<p><label>Test Email Address:</label><br>';
    echo '<input type="email" name="test_email" value="contact@nasirabsar.com" style="width: 300px; padding: 5px;">';
    echo '</p>';
    echo '<button type="submit">Send Test Email</button>';
    echo '</form>';
    echo '</div>';
    
    // Instructions
    echo '<div class="info">';
    echo '<h2>Next Steps</h2>';
    echo '<ol>';
    echo '<li>Click "Send Test Email" above to test email functionality</li>';
    echo '<li>Check your email inbox (and spam folder) for the test email</li>';
    echo '<li>If email doesn\'t arrive, check cPanel error logs</li>';
    echo '<li>Verify email account exists: <strong>contact@nasirabsar.com</strong></li>';
    echo '<li>Check cPanel → Email → Email Accounts to ensure the account is active</li>';
    echo '</ol>';
    echo '</div>';
    ?>
</body>
</html>

