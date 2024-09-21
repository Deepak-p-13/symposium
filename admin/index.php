New! Keyboard shortcuts … Drive keyboard shortcuts have been updated to give you first-letters navigation
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
    <form method="POST" action="">
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
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                echo "<table border='1'>";
                echo "<tr><th>ID</th><th>Email</th><th>Name</th><th>Gender</th><th>College/University</th><th>Department</th></th><th>Event1</th><th>Event2</th><th>Event3</th><th>Event4</th><th>Phone</th><th>Accommodation</th><th>Accommodation Date</th><th>College Bus</th><th>Boarding Point</th></tr>";

                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>" . $row['ID'] . "</td>";
                    echo "<td>" . $row['Email'] . "</td>";
                    echo "<td>" . $row['Name'] . "</td>";
                    echo "<td>" . $row['Gender'] . "</td>";
                    echo "<td>" . $row['CollegeOrUniversityName'] . "</td>";
                    echo "<td>" . $row['DepartmentName'] . "</td>";
                    // Displaying Payment Proof as a link to view the image (assuming it's stored as BLOB)
                   // echo "<td><a href='view_image.php?id=" . $row['ID'] . "'>View Image</a></td>";
                   // echo "<td>" . $row['PaymentReference'] . "</td>";
                   $events = explode(', ', $row['TechnicalEvent']); // Adjust delimiter if needed

                   // Ensure the array has exactly 4 elements, even if there are fewer events
                   $events = array_pad($events, 4, 'N/A'); // 'N/A' will be displayed if there are fewer events
               
                   // Output each event in its own column
                  
                     
                   echo "<td>" . $events[0] . "</td>"; // Event 1
                   echo "<td>" . $events[1] . "</td>"; // Event 2
                   
                   
                   
                    $events = explode(', ', $row['NonTechnicalEvent']); // Adjust delimiter if needed

                   // Ensure the array has exactly 4 elements, even if there are fewer events
                   $events = array_pad($events, 4, 'N/A'); // 'N/A' will be displayed if there are fewer events
               
                   // Output each event in its own column
                  
                     
                   echo "<td>" . $events[0] . "</td>"; // Event 1
                   echo "<td>" . $events[1] . "</td>"; // Event 2
                   
                    echo "<td>" . $row['PhoneNumber'] . "</td>";
                    echo "<td>" . $row['Accommodation'] . "</td>";
                    echo "<td>" . $row['AccommodationDate'] . "</td>";
                    echo "<td>" . $row['CollegeBus'] . "</td>";
                    echo "<td>" . $row['BoardingPoint'] . "</td>";
                    echo "</tr>";
                }

                echo "</table>";

                // Add a link to download the data in CSV format
                echo '<a href="download_data.php">Download CSV</a>';
            } else {
                echo "No records found.";
            }
            mysqli_free_result($result);
        } else {
            echo "Query error: " . mysqli_error($conn);
        }
    }
    ?>
</body>
</html>