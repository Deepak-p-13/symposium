<?php
// Define your username and password here
$correctUsername = "admin";
$correctPassword = "123";
$enteredUsername = "";
$enteredPassword = "";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $enteredUsername = $_POST["username"];
    $enteredPassword = $_POST["password"];

    // Check if the entered username and password match the correct credentials
    if ($enteredUsername == $correctUsername && $enteredPassword == $correctPassword) {
        // Username and password are correct; continue to display the data
    } else {
        echo "Incorrect username or password. Access denied.";
        exit; // Terminate script execution
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Event Registration Data</title>
</head>
<body>
    <h1>Event Registration Data</h1>

    <!-- Username and Password input form -->
    <form method="POST" paction="">
        <label for="username">Enter Username:</label>
        <input type="text" name="username" required><br>

        <label for="password">Enter Password:</label>
        <input type="password" name="password" required><br>

        <input type="submit" value="Submit">
    </form>

    <?php
    // Display the table only if the username and password are correct
    if ($enteredUsername == $correctUsername && $enteredPassword == $correctPassword) {
        // Create a database connection
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "eventregistration";

        $conn = mysqli_connect($servername, $username, $password, $dbname);

        // Check the connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Query to retrieve all data from the EventRegistration table using mysqli_query
        $sql = "SELECT * FROM eventregistration";
        $result = mysqli_query($conn, $sql);

        // Close the database connection
        mysqli_close($conn);

        // Display the table
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $fileName = $_FILES["image"]["name"];
            $fileSize = $_FILES["image"]["size"];
            $tmpName = $_FILES["image"]["tmp_name"];
        
            // Allowed image extensions
            $validImageExtension = ['jpg', 'jpeg', 'png'];
            $imageExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
            // Validate file type and size
            if (!in_array($imageExtension, $validImageExtension)) {
                echo "<script>alert('Invalid Image Extension');</script>";
            } elseif ($fileSize > 1000000) {
                echo "<script>alert('Image Size Is Too Large');</script>";
            } else {
                // Generate a unique name for the image
                $newImageName = uniqid() . '.' . $imageExtension;
        
                // Move the uploaded file
                if (move_uploaded_file($tmpName, 'img/' . $newImageName)) {
                    // Save the new image name in the database
                    // Use $newImageName as the value for 'PaymentProof' in the INSERT query
                } else {
                    echo "Failed to move uploaded file.";
                }
            }
        } else {
            echo "No file was uploaded or there was an error.";
        }
        
    }
    ?>
</body>
</html>
