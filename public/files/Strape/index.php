<?php
$username = "admin";
$password = "testtester";
$nonsense = "supercalifragilisticexpialidocious";

if (isset($_COOKIE['PrivatePageLogin'])) {
   if ($_COOKIE['PrivatePageLogin'] == md5($password.$nonsense)) {
?>


<!DOCTYPE html>
<html>
   <head>
      <link rel="apple-touch-icon" href="images/apple-icon.png">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
      <meta name="viewport" content="width=device-width, user-scalable=no">

      <title>Get Strape now!</title>
      <link rel="stylesheet" type="text/css" href="styles.css">
      <!--<link rel="stylesheet" type="text/css" href="skrollr.css" data-skrollr-stylesheet />-->
   </head>
   <body>
      <div id="background"></div>
      <video autoplay loop poster="images/clouds.jpg" id="bgvid" data-0="opacity: 1; display: !block;" data-400="opacity: 0; display: !none">
         <source src="images/clouds.mp4" type="video/mp4">
      </video>
      <nav id="actions">
         <a target="_blank" href="https://www.twitter.com"></a>
         <a href="https://www.facebook.com"></a>
         <a href="https://www.google.com"></a>
         <div id="languages">
            <a href="/en"></a>
            <a href="/nl"></a>
         </div>
      </nav>
      <header>
         <img id="logo" src="images/logo.svg">
         <h1>Strape</h1>
         <p id="tagline">The simplest payment app ever</p>
         <a class="app-store" href="https://store.apple.com">
            <img alt="Download on the App Store" src="images/app-store-badge.svg">
         </a>
         <a class="google-play" href="https://play.google.com">
            <img alt="Get it on Google Play" src="images/google-play-badge.svg" />
         </a>
         <p id="warning" data-0="opacity: 1;" data-100="opacity: 0;">Be warned, straping is so easy, it may feel like a game, but the payments are real!</p>
         <a href="" id="down" data-0="opacity: 1;" data-100="opacity: 0;"></a>
      </header>
      <section id="animation">
      </section>
      <section id="information" class="white">
         <div class="row">
            <div class="col-8">
               <h2>Strape = Bitcoin made easy</h2>
               <p>At Strape we truly believe in the opportunities bitcoin presents for society, businesses and individuals. But we also see that using bitcoin is still way too complex for most of us. This hinders real mass adoption, and that's a pity. Strape is our attempt to make using bitcoin as accessible and easy as possible.</p>
            </div>
            <div class="col-4">
               <img id="coin" src="images/bitcoin.svg">
            </div>
         </div>
         <div class="row">
            <div class="col-4">
               <img id="coin" src="images/bitcoin.svg">
            </div>
            <div class="col-8">
               <h2>Strape = Secure</h2>
               <p>The Strape app on your phone and your cloud wallet are uniquely and securely linked, one-on-one. Your app is the only access to your wallet and you need your PIN to enter your app. You only enter your Strape PIN on your own phone. Ever!</p>
            </div>
         </div>
         <div class="row">
            <div class="col-8">
               <h2>Strape = Compliant</h2>
               <p>All Bitcoin to other currency (Exchange) transactions initiated from your Strape app are executed by Bitmymoney, compliant with all applicable regulation for such transactions. If you want, you can view all exchange transactions initiated from your Strape app when you activate your Bitmymoney account. It's up to you.</p>
            </div>
            <div class="col-4">
               <img id="coin" src="images/bitcoin.svg">
            </div>
         </div>
         <div class="row">
            <div class="col-4">
               <img id="coin" src="images/bitcoin.svg">
            </div>
            <div class="col-8">
               <h2>Strape = Clear pricing</h2>
               <p>The Strape app is free, and so are all Strape transactions between users. On all Bitcoin Exchange transactions we charge a currency exchange fee of 2.5%, with a minimum of &euro;0,50 (or the equivalent in other supported currencies).</p>
            </div>
         </div>
         <div class="row">
            <div class="col-8">
               <h2>Lost your phone?</h2>
               <p>That's a bummer, but we've got you covered. When you activate a new Strape app on a new phone and you use the same mobile number you registered with before, you can recover your account by entering your 'old' Strape PIN code. </p>
            </div>
            <div class="col-4">
               <img id="coin" src="images/bitcoin.svg">
            </div>
         </div>
         <div class="row">
            <div class="col-4">
               <img id="coin" src="images/bitcoin.svg">
            </div>
            <div class="col-8">
               <h2>Strepen = Tossing beer</h2>
               <p>The name 'Strape' was inspired by the Dutch word 'strepen'. 'Strepen' is the art of tossing a glass of beer through the air, in such a way that the beer stays in the glass. It's mostly practiced by Dutch students and is quite difficult to master. As opposed to Straping, which is extremely simple.</p>
            </div>
         </div>
      </section>
      <section id="reviews" class="blue">
         <div class="row">
            <h2>Here is what people like about Strape</h2>
         </div>
      </section>
      <footer class="white">
         <div class="row">
            <a href="/about">Who is Strape</a>
            <a href="mailto:info@strape.nl">Contact</a>
            <a href="/terms">Terms and privacy</a>
            <p>&copy;2015 Vlinderstorm BV. All rights reserved.</p>
            <div class="fb-like" data-layout="button_count"></div>
         </div>
      </footer>
      <script src="scripts.js"></script>
      <!--Facebook-->
      <script>
         window.fbAsyncInit = function() {
            FB.init({appId: '410126135818632', xfbml: true, version: 'v2.2'});
         };
         
         (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}

            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      </script>

      <!--Skrollr.js-->
      <!--<script type="text/javascript" src="skrollr.stylesheets.min.js"></script>-->
      <script type="text/javascript" src="skrollr.min.js"></script>
      <script type="text/javascript">var s = skrollr.init();</script>
   </body>
</html>



<?php
      exit;
   } else {
      echo "Bad Cookie.";
      exit;
   }
}

if (isset($_GET['p']) && $_GET['p'] == "login") {
   if ($_POST['user'] != $username) {
      echo "Sorry, that username does not match.";
      exit;
   } else if ($_POST['keypass'] != $password) {
      echo "Sorry, that password does not match.";
      exit;
   } else if ($_POST['user'] == $username && $_POST['keypass'] == $password) {
      setcookie('PrivatePageLogin', md5($_POST['keypass'].$nonsense));
      header("Location: $_SERVER[PHP_SELF]");
   } else {
      echo "Sorry, you could not be logged in at this time.";
   }
}
?>

<form action="<?php echo $_SERVER['PHP_SELF']; ?>?p=login" method="post">
<label><input type="text" name="user" id="user" /> Name</label><br />
<label><input type="password" name="keypass" id="keypass" /> Password</label><br />
<input type="submit" id="submit" value="Login" />
</form>