<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MySQL Connection Test</title>
</head>
<body>
    <h1>MySQL Connection Test</h1>

    <?php
    // Database credentials
    $servername = "localhost";  // Server name (usually localhost for XAMPP)
    $username = "root";         // Default XAMPP username
    $password = "";             // Default XAMPP password is empty
    $dbname = "eventregistration";        // Name of your database

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("<p style='color: red;'>Connection failed: " . $conn->connect_error . "</p>");
    } else {
        echo "<p style='color: green;'>Successfully connected to MySQL database!</p>";
    }

    // Close connection
    $conn->close();
    ?>
</body>
</html>
