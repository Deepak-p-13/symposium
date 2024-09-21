<?php
session_start();

// Check if the user is authenticated (optional, based on your needs)


// Database connection details
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$dbname = "eventregistration";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the headers to download the file
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="event_registration_data.csv"');

// Open output stream
$output = fopen('php://output', 'w');

// Write the header row to the CSV
fputcsv($output, ['ID', 'Email', 'Name', 'Gender', 'College/University', 'Department', 'Event1', 'Event2', 'Event3', 'Event4', 'Phone', 'Accommodation', 'Accommodation Date', 'College Bus', 'Boarding Point', 'payment_id']);

// Query to retrieve all data from the EventRegistration table
$sql = "SELECT * FROM eventregistration";
$result = $conn->query($sql);

// Fetch each row and write it to the CSV
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Prepare the events for CSV output
        $technicalEvents = explode(', ', $row['TechnicalEvent']);
        $technicalEvents = array_pad($technicalEvents, 4, 'N/A'); // Pad to ensure 4 columns

        $nonTechnicalEvents = explode(', ', $row['NonTechnicalEvent']);
        $nonTechnicalEvents = array_pad($nonTechnicalEvents, 4, 'N/A'); // Pad to ensure 4 columns

        // Combine the row data with the events
        $data = [
            $row['ID'],
            $row['Email'],
            $row['Name'],
            $row['Gender'],
            $row['CollegeOrUniversityName'],
            $row['DepartmentName'],
            $technicalEvents[0], // Event 1
            $technicalEvents[1], // Event 2
            $technicalEvents[2], // Event 3
            $technicalEvents[3], // Event 4
            $row['PhoneNumber'],
            $row['Accommodation'],
            $row['AccommodationDate'],
            $row['CollegeBus'],
            $row['BoardingPoint'],
            $row['payment_id']
        ];

        // Write the row to the CSV
        fputcsv($output, $data);
    }
}

// Close the output stream
fclose($output);

// Free result and close the connection
$result->free();
$conn->close();
exit();
?>
