<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="images/icon-50.png">

		<title>Home | Square</title>

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
			<div class="jumbotron">
				<div id="carousel-example-generic" class="carousel carousel-fade slide">
					<!-- Indicators -->
						<ol class="carousel-indicators">
							<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
							<li data-target="#carousel-example-generic" data-slide-to="1"></li>
							<li data-target="#carousel-example-generic" data-slide-to="2"></li>
						</ol>

					<!-- Wrapper for slides -->
						<div class="carousel-inner">
							<div class="item active">
								<img src="images/catering.jpg" alt="..." style="margin-top: -70px">
								<div class="carousel-caption">
									<p>All-inclusive catering</p>
								</div>
							</div>
							<div class="item">
								<img src="images/huiskamer.jpg" alt="...">
								<div class="carousel-caption">
									<p>Sfeervolle huiskamerconcerten</p>
								</div>
							</div>
							<div class="item">
								<img src="images/color.jpg" alt="...">
								<div class="carousel-caption">
									<p>Feesten met van die kleurtjes</p>
								</div>
							</div>
						</div>

					<!-- Controls -->
						<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
							<span class="icon-prev"></span>
						</a>
						<a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
							<span class="icon-next"></span>
						</a>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 box">
					<a href="who.php">
						<div class="container blue">
							<span class="glyphicon glyphicon-user" style="font-size:130px"></span>
							<span style="display:block">Wie zijn wij?</span>
						</div>
					</a>
				</div>
				<div class="col-md-3 box">
					<a href="what.php">
						<div class="container bordeaux">
							<span class="glyphicon glyphicon-question-sign" style="font-size:130px"></span>
							<span style="display:block">Wat doen wij?</span>
						</div>
					</a>
				</div>
				<div class="col-md-3 box">
					<a href="concept.php">
						<div class="container green">
							<span class="glyphicon glyphicon-th-list" style="font-size:130px"></span>
							<span style="display:block">Concepten</span>
						</div>
					</a>
				</div>
				<div class="col-md-3 box">
					<a href="contact.php">
						<div class="container purple">
							<span class="glyphicon glyphicon-phone-alt" style="font-size:130px"></span>
							<span style="display:block">Contact</span>
						</div>
					</a>
				</div>
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
