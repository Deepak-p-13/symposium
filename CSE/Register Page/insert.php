<?php

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

        echo "Error: Email address already exists in the database.";

    } else {

        $name = mysqli_real_escape_string($conn, $_POST['name']);

        $gender = mysqli_real_escape_string($conn, $_POST['gender']);

        $college = mysqli_real_escape_string($conn, $_POST['college']);

        $department = mysqli_real_escape_string($conn, $_POST['department']);

        $payment_reference = mysqli_real_escape_string($conn, $_POST['payment_reference']);

        $technical_event = implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['technical_event']), $conn), $_POST['technical_event']));

        $non_technical_event = implode(', ', array_map('mysqli_real_escape_string', array_fill(0, count($_POST['non_technical_event']), $conn), $_POST['non_technical_event']));

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

            header("Location: https://chat.whatsapp.com/LCljDRuQoZUHrKzY0opEgt");

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