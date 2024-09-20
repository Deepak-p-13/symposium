<?php
// Connect to the database
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
if (isset($_POST['payment_id']) && isset($_POST['order_id'])) {
    $payment_id = $_POST['payment_id'];
    $order_id = $_POST['order_id'];

    // Insert the payment ID and order ID into the database
    $sql = "INSERT INTO payments (payment_id, order_id) VALUES ('$payment_id', '$order_id')";

    if ($conn->query($sql) === TRUE) {
        echo "Payment record inserted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
