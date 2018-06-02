<?php
$servername = "localhost";
$username = "woutepz52_beer";
$password = "as1h4gd27";
$dbname = "woutepz52_beer";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$name = $_POST["name"];
$b = intval($_POST["bottles"]);
$c = intval($_POST["crates"]);
$r = intval($_POST["returns"]);

$day = intval(date('w')) + 5;
if (intval(date('G')) >= 5) {
	$day += 1;
}
$day = $day % 7;

$sql = "UPDATE beerList SET bottles = bottles+$b, crates = crates+$c, returned = returned+$r WHERE name='$name';";

if ($b != 0) {
	$sql .= "UPDATE bottlesPerDay SET bottles = bottles+$b WHERE day='$day'";
}

if ($conn->multi_query($sql) === TRUE) {
    echo "Updated succesfully.";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
