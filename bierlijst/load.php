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

/*result = {
	persons: {
		name: {crates, bottles, returns},
		name: {crates, bottles, returns},
		...
		name: {crates, bottles, returns}
	},
	bottlesPerDay: [10, 30, 20, 15, 8, 0, 0]
}*/

echo '{"persons": {';

$sql = "SELECT * FROM beerList";
$personData = $conn->query($sql);

if ($personData->num_rows > 0) {
	$first = true;
	while($row = $personData->fetch_assoc()) {
		if ($first) {
			$first = false;
		} else {
			echo ',';
		}

		echo '"' . $row["name"] . '":{"crates":' . $row["crates"] . ',"bottles":' . $row["bottles"] . ',"returns":' . $row["returned"] . '}';
	}
}

echo '}, "bottlesPerDay": [';


$sql = "SELECT * FROM bottlesPerDay";
$dayData = $conn->query($sql);

if ($dayData->num_rows > 0) {
	$first = true;
	while($row = $dayData->fetch_assoc()) {
		if ($first) {
			$first = false;
		} else {
			echo ',';
		}

		echo '{"day":' . $row["day"] . ',"bottles":' . $row["bottles"] . '}';
	}
}

echo ']}';

$conn->close();
?>