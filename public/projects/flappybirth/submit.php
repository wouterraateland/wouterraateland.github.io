<?php
if ($_POST["score"] == '0' && $_POST["name"] == "Nobody") {
	echo fread(fopen("scores.txt", "r"), filesize("scores.txt"));
} else {
	$fr = fopen("scores.txt", "r");
	$a = array();
	$high = false;

	if ($fr) {
		while (($line = fgets($fr)) !== false) {
			$a[] = $line;
		}
		fclose($fr);

		for ($i = 0; $i < 20; $i += 2) {
			if ((int)$_POST["score"] > (int)$a[$i + 1]) {
				array_splice($a, $i, 0, $_POST["name"]."\n");
				array_splice($a, $i + 1, 0, $_POST["score"]."\n");
				$high = true;
				break;
			}
		}

		if ($high == true) {
			array_pop($a);
			array_pop($a);
			fwrite(fopen("scores.txt", "w"), implode($a));
		}

		echo implode($a);
	} else {
		echo 'error';
	}
}
?>