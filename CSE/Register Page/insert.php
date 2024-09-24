<?php
session_start();
$servername = "localhost";

$username = "root";

$password = "";

$dbname = "eventregistration";



// Create a database connection

$conn = mysqli_connect($servername, $username, $password, $dbname);



// Check the connection

if (!$conn) {

    die("Connection failed: " . mysqli_connect_error());

}



// Retrieve data from the form

$email = mysqli_real_escape_string($conn, $_POST['email']); // Prevent SQL injection



// Check if the email already exists in the database

$check_sql = "SELECT COUNT(*) FROM eventregistration WHERE Email = '$email'";

$check_result = mysqli_query($conn, $check_sql);



if ($check_result) {

    $row = mysqli_fetch_row($check_result);

    $email_count = $row[0];

    mysqli_free_result($check_result);



    if ($email_count > 0) {

        echo "<script>
        alert('Error: Email address already exists in the database.');
        window.location.href = './register.html'; // Redirect to the registration page
    </script>";

    } else {

        $name = mysqli_real_escape_string($conn, $_POST['name']);

        $gender = mysqli_real_escape_string($conn, $_POST['gender']);

       // This will contain the dropdown selection

       
       $college = mysqli_real_escape_string($conn, $_POST['college']); // Get the selected value

       // Check if 'Other' was selected, then update $college with the manually entered college name
       if ($college === 'Other') {
           $college = mysqli_real_escape_string($conn, $_POST['other_college']); // Update $college with the manual input
       }
       
       // Now $college will contain either the selected college name or the manually entered one
       
        $department = mysqli_real_escape_string($conn, $_POST['department']);

        $payment_reference = mysqli_real_escape_string($conn, $_POST['payment_reference']);

        $technical_event = implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['technical_event']), $conn), $_POST['technical_event']));

        if (isset($_POST['non_technical_event']) && !empty($_POST['non_technical_event'])) {
            $non_technical_event = implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['non_technical_event']), $conn), $_POST['non_technical_event']));
        } else {
            $non_technical_event = NULL; // Set to NULL if no event is selected
        }
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);

        $accommodation = mysqli_real_escape_string($conn, $_POST['accommodation']);

        $accommodation_date = mysqli_real_escape_string($conn, $_POST['accommodation_date']);

        $college_bus = mysqli_real_escape_string($conn, $_POST['college_bus']);

        $boarding_point = mysqli_real_escape_string($conn, $_POST['boarding_point']);



        // Handle payment proof upload

        $payment_proof = null;



        // Insert the data into the database using prepared statements

        $stmt = mysqli_prepare($conn, "INSERT INTO eventregistration (ID, Email, Name, Gender, CollegeOrUniversityName, DepartmentName, PaymentProof, PaymentReference, TechnicalEvent, NonTechnicalEvent, PhoneNumber, Accommodation, AccommodationDate, CollegeBus, BoardingPoint) VALUES (null,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        

        mysqli_stmt_bind_param($stmt, "ssssssssssssss", $email, $name, $gender, $college, $department, $payment_proof, $payment_reference, $technical_event, $non_technical_event, $phone, $accommodation, $accommodation_date, $college_bus, $boarding_point);



        if (mysqli_stmt_execute($stmt)) {

            // Registration successful, redirect to the WhatsApp link

            $_SESSION['email'] = $email;

            header("Location: index.php");

            mysqli_stmt_close($stmt);

            mysqli_close($conn);

            exit(); // Make sure to exit to prevent further script execution

        } else {

            echo "Error: " . mysqli_error($conn);

        }



        mysqli_stmt_close($stmt);

    }

}



// Close the database connection

mysqli_close($conn);

?>