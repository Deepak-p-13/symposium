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
$email = mysqli_real_escape_string($conn, $_POST['email']);

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
        $technical_event = implode(', ', array_map(function($event) use ($conn) {
            return mysqli_real_escape_string($conn, $event);
        }, $_POST['technical_event']));
        $non_technical_event = implode(', ', array_map(function($event) use ($conn) {
            return mysqli_real_escape_string($conn, $event);
        }, $_POST['non_technical_event']));
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $accommodation = mysqli_real_escape_string($conn, $_POST['accommodation']);
        $accommodation_date = mysqli_real_escape_string($conn, $_POST['accommodation_date']);
        $college_bus = mysqli_real_escape_string($conn, $_POST['college_bus']);
        $boarding_point = mysqli_real_escape_string($conn, $_POST['boarding_point']);

        // Handle payment proof upload
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
            $fileName = $_FILES["image"]["name"];
            $fileSize = $_FILES["image"]["size"];
            $tmpName = $_FILES["image"]["tmp_name"];
            $fileType = $_FILES["image"]["type"];
            $validImageExtension = ['jpg', 'jpeg', 'png'];
            $imageExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            if (!in_array($imageExtension, $validImageExtension)) {
                echo "<script>alert('Invalid Image Extension');</script>";
            } else if ($fileSize > 1000000) {
                echo "<script>alert('Image Size Is Too Large');</script>";
            } else {
                $newImageName = uniqid() . '.' . $imageExtension;
                $uploadPath = 'img/' . $newImageName;

                // Check if directory exists and is writable
                if (!is_dir('img')) {
                    echo "Directory 'img' does not exist.";
                } else if (!is_writable('img')) {
                    echo "Directory 'img' is not writable.";
                } else if (move_uploaded_file($tmpName, $uploadPath)) {
                    // Insert the data into the database using prepared statements
                    $stmt = mysqli_prepare($conn, "INSERT INTO eventregistration (ID, Email, Name, Gender, CollegeOrUniversityName, DepartmentName, PaymentProof, PaymentReference, TechnicalEvent, NonTechnicalEvent, PhoneNumber, Accommodation, AccommodationDate, CollegeBus, BoardingPoint) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

                    mysqli_stmt_bind_param($stmt, "ssssssssssssss", $email, $name, $gender, $college, $department, $newImageName, $payment_reference, $technical_event, $non_technical_event, $phone, $accommodation, $accommodation_date, $college_bus, $boarding_point);

                    if (mysqli_stmt_execute($stmt)) {
                        // Registration successful, redirect to the WhatsApp link
                        header("Location: https://chat.whatsapp.com/LCljDRuQoZUHrKzY0opEgt");
                        mysqli_stmt_close($stmt);
                        mysqli_close($conn);
                        exit(); // Ensure no further script execution
                    } else {
                        echo "Error: " . mysqli_error($conn);
                    }

                    mysqli_stmt_close($stmt);
                } else {
                    echo "Failed to move uploaded file.";
                }
            }
        } else {
            echo "No file was uploaded or there was an error. Error code: " . $_FILES["image"]["error"];
        }
    }
}

// Close the database connection
mysqli_close($conn);
?>
