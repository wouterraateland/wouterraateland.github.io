<?php
$servername = "localhost";
$username = "woutepz52_run";
$password = "dBtkqPVq9";
$dbname = "woutepz52_run";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$name = $_POST["name"];

$sql = "INSERT INTO Names ".
	   "(name, likes, dislikes) ".
	   "VALUES ".
	   "('$name', 0, 0)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

