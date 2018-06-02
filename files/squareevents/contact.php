<?php
$send = bool;

if($_POST['name'] && $_POST['email'] && $_POST['text']){
	$send = true;

	$name = $_POST['name'];
	$email = $_POST['email'];
	$text = $_POST['text'];

	$message = 'Naam: '.$name.'
E-mailadres: '.$email.'
Bericht: '.$text;

	mail('joris.oudejans@gmail.com', 'Square contact:'.$name, $message);
} else { $send = false; }

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="images/icon-50.png">

		<title>Contact | Square</title>

		<!-- Bootstrap core CSS -->
		<link href="dist/css/bootstrap.css" rel="stylesheet">
		<link href="styles/page.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="assets/js/html5shiv.js"></script>
			<script src="assets/js/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>
		<?php include_once('header.php'); ?>

		<div class="container">
			<hr style="margin-top: 0px;" />
		</div>

		<div class="container">
			<div class="row">
				<div class="col-md-3">
					</div>
				<div class="col-md-9">
					<h1 class="title">Stuur een bericht</h1>
					<h2 style="font-style: italic;">of vraag meteen een offerte aan</h2>
				</div>
			</div>
			<div class="row" style="margin-top:30px;">
				<div class="col-md-4">
					<span class="glyphicon glyphicon-send" style="font-size:130px; display:block; text-align:center; color:#8064a2;"></span>
				</div>
				<div class="col-md-8">
					<?php if($send == false){ ?>
						<form action="contact.php" method="post" id="contact_form">
							<div class="input-group input-group-lg" id="name-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
								<input id="name" type="text" class="form-control" placeholder="Voor- en achternaam / Bedrijf" name="name">
							</div>

							<div class="input-group input-group-lg" id="email-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
								<input id="email" type="text" class="form-control" placeholder="E-mailadres" name="email">
							</div>

							<div class="input-group input-group-lg" id="text-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-align-left"></span></span>
								<textarea id="text" class="form-control" style="height:200px;" placeholder="Berichttekst" name="text"></textarea>
							</div>
							
							<div class="input-group input-group-lg pull-right">
								<input type="submit" class="btn btn-purple">
							</div>
						</form>
					<?php } else { ?>
						<p>Uw bericht is verstuurd, wij zullen u zo spoedig mogelijk antwoorden.</p>
					<?php } ?>
				</div>
			</div>

			<div id="map" class="row">
				<div class="col-md-3">
					</div>
				<div class="col-md-9">
					<h1 class="title">Bezoek ons hier</h1>
				</div>
			</div>

			<div id="map" class="row">
				<iframe width="100%" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzRTh-8Hc9c671sNV7_YXe5y3esXcQVyQ&q=Amsterdam+Arena"></iframe>
			</div>

			<?php include_once('footer.php'); ?>

		</div><!-- /.container -->


		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="assets/js/jquery.js"></script>
		<script src="dist/js/bootstrap.min.js"></script>
		<script src="js/script.js"></script>
	</body>
</html>