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
$l = intval($_POST["likes"]);
$d = intval($_POST["dislikes"]);

$sql = "UPDATE Names SET likes = likes+$l, dislikes = dislikes+$d WHERE name='$name'";

if ($conn->query($sql) === TRUE) {
    echo "Updated succesfully.";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
