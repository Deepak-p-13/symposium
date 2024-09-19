<?php
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

// Query to retrieve all data except payment proof from the EventRegistration table using mysqli_query
$sql = "SELECT ID, Email, Name, Gender, CollegeOrUniversityName, DepartmentName, PaymentReference, TechnicalEvent, NonTechnicalEvent, PhoneNumber, Accommodation, AccommodationDate, CollegeBus, BoardingPoint FROM eventregistration";
$result = mysqli_query($conn, $sql);

if ($result) {
    // Generate CSV data
    $csvFileName = "event_registration_data.csv";
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="' . $csvFileName . '"');

    $output = fopen('php://output', 'w');

    // Write the CSV header row
    fputcsv($output, array('ID', 'Email', 'Name', 'Gender', 'College/University', 'Department', 'Payment Reference', 'Technical Event', 'Non-Technical Event', 'Phone', 'Accommodation', 'Accommodation Date', 'College Bus', 'Boarding Point'));

    // Write the data rows
    while ($row = mysqli_fetch_assoc($result)) {
        fputcsv($output, $row);
    }

    fclose($output);
    mysqli_free_result($result);
} else {
    echo "Query error: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);
?>
