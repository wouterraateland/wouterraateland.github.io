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

$sql = "SELECT * FROM Names";
$data = $conn->query($sql);
$first = true;
$n = 0;

//result = [{index, name, dislikes, likes}, {index, name, dislikes, likes}, ..., {index, name, dislikes, likes}]

if ($data->num_rows > 0) {
	echo "[";
	while($row = $data->fetch_assoc()) {
		if ($first) {
			$first = false;
		} else {
			echo ",";
		}

		echo '{"index":' . $n . ',"name":"' . $row["name"] . '","dislikes":' . $row["dislikes"] . ',"likes":' . $row["likes"] . '}';
		
		$n += 1;
    }
	echo "]";
} else {
    echo "[]";
}

$conn->close();
?>
