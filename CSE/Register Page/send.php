<?php
session_start();

// Ensure the correct autoload path for PHPMailer
require __DIR__ . '/vendor/autoload.php';

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$dbname = "eventregistration";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Enable error reporting for troubleshooting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Check if the email session variable is set
if (isset($_SESSION['email'])) {
    $email = $_SESSION['email']; // Get the email from the session
} else {
    echo "No email found. Please register.";
    exit();
}

// SQL query to fetch user details
$sql = "SELECT * FROM eventregistration WHERE Email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $row = $result->fetch_assoc()) {
    $user_id = $row['ID'];
    $user_name = $row['Name'];

    // Technical Events
    $technical_events = explode(', ', $row['TechnicalEvent']);
    $technical_events_str = implode(', ', $technical_events);

    // Non-Technical Events
    $non_technical_events = explode(', ', $row['NonTechnicalEvent']);
    $non_technical_events_str = implode(', ', $non_technical_events);
    
} else {
    die("No registration found for the email: " . htmlspecialchars($email));
}

try {
    // Create an instance of PHPMailer and configure the settings
    $mail = new PHPMailer(true);

    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;                      // Disable verbose debug output for production
    $mail->isSMTP();                                         // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                // Enable SMTP authentication
    $mail->Username   = 'elements@srec.ac.in';               // SMTP username
    $mail->Password   = 'bsuybsyprmahfyjh';                  // SMTP password (use environment variables for security)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      // Enable TLS encryption
    $mail->Port       = 587;                                 // TCP port to connect to

    // Recipients
    $mail->setFrom('elements@srec.ac.in', 'Elements 2k24');
    $mail->addAddress($email);  // Add recipient

    // Content
    $mail->isHTML(true);                                         // Set email format to HTML
    $mail->Subject = 'Registration Confirmation for Elements 2k24';
    $mail->Body = "
    <p>Dear $user_name,</p>
    <p>Thank you for registering for Elements 2k24! We are excited to have you join us for this exciting symposium.</p>
    <p><strong>Your Registration Details:</strong></p>
    <ul>
        <li><strong>User ID:</strong> $user_id</li>
        <li><strong>Name:</strong> $user_name</li>
        <li><strong>Technical Events:</strong> $technical_events_str</li>
        <li><strong>Non-Technical Events:</strong> $non_technical_events_str</li>
    </ul>
    <p>We look forward to your participation. Keep your unique ID handy for event verification.</p>
    <p>Best regards,<br>Elements 2k24 Organizing Committee<br>Department of CSE,<br>Sri Ramakrishna Engineering College.</p>";

    // Plain text version for non-HTML mail clients
    $mail->AltBody = "Dear $user_name,\n\nThank you for registering for Elements 2k24! Your Unique ID is $user_id. Please join us for the events.\nBest regards,\nElements 2k24 Organizing Committee";

    // Send the email
    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

// Close the database connection
$stmt->close();
$conn->close();
?>

