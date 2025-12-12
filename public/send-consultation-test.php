<?php
/**
 * Consultation Form Email Handler - Test Version
 * This version outputs HTML first to verify PHP is executing
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Consultation Form Handler Test</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .success { background: #d4edda; color: #155724; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 20px; border-radius: 5px; margin: 20px 0; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>Consultation Form Handler Test</h1>
    
    <div class="success">
        <h2>✅ PHP is Executing!</h2>
        <p>If you can see this page, PHP is working correctly.</p>
        <p><strong>PHP Version:</strong> <?php echo phpversion(); ?></p>
        <p><strong>Request Method:</strong> <?php echo $_SERVER['REQUEST_METHOD']; ?></p>
    </div>

    <?php
    // Now test the actual form submission logic
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        echo '<div class="info">';
        echo '<h2>POST Request Received</h2>';
        
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            $data = $_POST;
        }
        
        echo '<pre>';
        echo "Raw Input: " . htmlspecialchars($input) . "\n\n";
        echo "Parsed Data:\n";
        print_r($data);
        echo '</pre>';
        
        // Test email sending
        $to = 'contact@nasirabsar.com';
        $subject = 'Test from send-consultation-test.php';
        $message = 'This is a test email from the consultation form handler.';
        $headers = "From: noreply@nasirabsar.com\r\n";
        $headers .= "Reply-To: noreply@nasirabsar.com\r\n";
        
        if (@mail($to, $subject, $message, $headers)) {
            echo '<div class="success">✅ Test email sent successfully!</div>';
        } else {
            echo '<div class="error">❌ Failed to send test email</div>';
        }
        
        echo '</div>';
    } else {
        echo '<div class="info">';
        echo '<h2>Instructions</h2>';
        echo '<p>This is a test version of the consultation form handler.</p>';
        echo '<p><strong>To test POST request:</strong></p>';
        echo '<pre>curl -X POST https://www.nasirabsar.com/send-consultation-test.php \\
  -H "Content-Type: application/json" \\
  -d \'{"name":"Test","email":"test@test.com","message":"Hello"}\'</pre>';
        echo '</div>';
    }
    ?>
    
    <div class="info">
        <h2>Next Steps</h2>
        <p>If this page works, the actual <code>send-consultation.php</code> should also work.</p>
        <p>Make sure <code>send-consultation.php</code> is uploaded to the same location.</p>
    </div>
</body>
</html>

