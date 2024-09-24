<?php
session_start();
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$dbname = "eventregistration";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the payment ID and order ID from the AJAX request
if (isset($_POST['payment_id'], $_POST['order_id'], $_POST['email'])) {
    $payment_id = $_POST['payment_id'];
    $order_id = $_POST['order_id'];
    $email = $_POST['email'];

    // Store the email in session for use in the next script (send.php)
    $_SESSION['email'] = $email;

    // Insert the payment ID into the database using a prepared statement to prevent SQL injection
    $stmt = $conn->prepare("UPDATE eventregistration SET payment_id = ? WHERE email = ?");
    $stmt->bind_param("ss", $payment_id, $email);
    
    if ($stmt->execute()) {
        echo "Payment record updated successfully";
        
        // Redirect to send.php after successful update
        header("Location: send.php");
        exit(); // Stop further script execution
    } else {
        echo "Error updating payment record: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
}

$conn->close();
?>

