<!DOCTYPE>
<html>
<head>
	<meta charset="utf8">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<title>Buzzik - Blindtest new generation</title>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.3.0/grids-min.css">
	<link rel="stylesheet" href="css/style.css">

</head>
<body>
	<section id="all">
		<div id="rooms"></div>
		<div id="dz-root"></div>
		<div class="topBar">
			<div class="pure-g-r content">
				    <div class="pure-u-1-2">
				    	<a href="http://www.facebook.fr" title="Facebook"><img src="images/icon_facebook.png" alt="Logo Facebook" /></a>
				    	<a href="http://www.twitter.fr" title="Twitter"><img src="images/icon_twitter.png" alt="Logo Twitter" /></a>
				    </div>
				    <div class="pure-u-1-2 alignRight">
				    	<ul>
				    		<li><img src="images/icon_player_small.png" /></li>
				    		<li><a href="#connecter" title="Se connecter">Connexion</a></li>
				    		<li>|</li>
				    		<li><img src="images/icon_pen.png" /></li>
				    		<li><a href="" title="S'inscrire">Inscription</a></li>
				    	</ul>
				    	<ul class="off">
				    		<li><input type="text" name="login" placeholder="Identifiant" /></li>
				    		<li><input type="password" name="pwd" placeholder="Mot de passe" /></li>
				    		<li><input type="submit" name="connexion" value="Connexion" /></li>
				    		<li><a href="#"><img src="images/icon_logo_fb.png" />Connexion via Facebook</a></li>
				    	</ul>
				    </div>
				</div> 
			</div>
		</div>
		<header>
			<div class="pure-g-r menu content">

			    <div class="pure-u-1-2">
			    	<a href="./" title="Logo"><img src="images/logo.png" alt="Logo" /></a>
			    </div>
			    <div class="pure-u-1-2 alignRight">
			    	<ul>
			    		<li><a href="./" title="Retourner à l'accueil" class="hover">Accueil</a></li>
			    		<li><a href="" title="Jouer">Jouer</a></li>
			    		<li><a href="" title="Communauté">Communauté</a></li>
			    	</ul>
			    </div>

			</div>
			<div class="pure-g-r baseline content">

			    <div class="pure-u-1-2 verticalAlignMiddle animated slideInLeft">
			    	<div class="l-box">
				    	<h1>Buzzik : blindtest new generation</h1>
				    	<p class="justify">
						You love music ? You recognize songs quickly ? But are you the best ?
						Start playing now !
						</p> 
						
						<p class="justify">
						With your family or friends fall into the musical world of Buzzik. It's crazy, fun and music !
						</p>
				    	
				    	<a class="btn alignRight marginTop" href="#jouer" title="Jouer dès maintenant">Jouer !</a>
				    </div>	
			    </div>
			    <div class="pure-u-1-2 alignRight animated slideInRight">
			    	<div class="l-box">
			    		<img class="noOpacity" src="images/imac_Buzzik.png" alt="Découvrez Buzzik" />
			    	</div>	
			    </div>

			</div>
		</header>
		<section class="content">
			<div class="pure-g-r">
				 <div class="pure-u-1 titleDivision">
					<h2 class="h2titleDivision">HOW TO PLAY</h2>
				</div>
			</div>

			<div class="pure-g-r">

			    <div class="pure-u-1-2 video-container l-box">
				    	<video controls autobuffer>
				    		 <source src="video/motion_presentation.mp4" type="video/mp4">
				    		 Your browser does not support the video tag.
				    	</video>
			    	<!-- <iframe src="http://www.youtube.com/embed/LHVJumOSCyE" frameborder="0" width="540" height="315"></iframe> -->
			    </div>
			    <div class="pure-u-1-2 regleDuJeu l-box">
				    	<h2>RULES OF THE GAME</h2>
				    	<ul>
				    		<li><img src="./images/icon_player_hover.png" /></li>
				    		<li>1 to 4 PLAYERS</li>
				    		<li><img src="./images/icon_smartphone.png" /> </li>
				    		<li>4 MOBILES PHONES</li>
				    		<li><img src="./images/icon_computer.png" /></li>
				    		<li>1 COMPUTER</li>
				    	</uL>
			    </div>

			</div>
		</section>
		<section id="jouer" class="content">
			<div class="pure-g-r">
				 <div class="pure-u-1 titleDivision">
					<h2 class="h2titleDivision">LET'S PLAY</h2>
				</div>
			</div>

			<div class="pure-g-r">

			    <div class="pure-u-1-2 regleDuJeu l-box">
					<h2>SIMPLE PLAYER</h2>
					<p>
						### Breaking News ###<br>
						Sorry, this feature has not yet been coded. Please come back later...
					</p>
					<div class="pure-g-r marginTop">
						<div class="pure-u-1-2">
							<p class="orange fsNormal alignCenter marginTop">
								<img class="verticalAlignMiddle" src="images/icon_multiple_user.png" alt="Des milliers de joueurs" /> 1500 players
							</p>	
						</div>
						<div class="pure-u-1-2">
							<p class="orange fsNormal alignCenter marginTop">
								<img class="verticalAlignMiddle" src="images/icon_microphone.png" alt="Des centaines de parties" /> 50 rooms
							</p>
						</div>
					</div>
					<div class="pure-g-r">
						 <div class="pure-u-1 alignCenter marginTop">
						 	<h3 class="marginBottomSmall">TRACKS</h3>
							<div id='nbrChanson' class="nbrChanson"></div>
							<input type="text" id="amount" class="orange fsNormal alignCenter marginTopSmall" disabled/>
						</div>
					</div>
					<div class="pure-g-r">
						 <div class="pure-u-1 alignCenter marginTop">
						 	<a href="#" class="btnLarge fsNormal">Start the game</a>
						</div>
					</div>
			    </div>
			    <div class="pure-u-1-2 regleDuJeu l-box" id="reglages">
					<h2>MULTIPLAYERS</h2>
					<div class="pure-g-r">
						<div class="pure-u-1">
							<input type='text' class="marginBottomSmall" placeholder='Enter party name...' name='nomPartie' required />
						</div>
						<div class="pure-u-1" id="choisirNbrJoueur" data-nbrjoueur="1">

						</div>
					</div>
					<div class="pure-g-r">
						 <div class="pure-u-1 alignCenter marginTopSmall">
						 	<h3 class="marginBottomSmall">TRACKS</h3>
							<div id='nbrChanson2' class="nbrChanson"></div>
							<input type="text" id="amount2" class="orange fsNormal alignCenter marginTopSmall" disabled/>
						</div>
					</div>
					<div class="pure-g-r">
						 <div class="pure-u-1 alignCenter marginTop">
						 	<a href="#multiple_player" class="btnLarge fsNormal">Start the game</a>
						</div>
					</div>
			    </div>

			</div>
		</section>
		<section class="top marginTop">
			<div class="pure-g-r content">
				 <div class="pure-u-1 titleDivision">
					<h2 id="h2titleDivision">COMMUNITY</h2>
				</div>
			</div>

			<div class="pure-g-r content">
				    <div class="pure-u-1-3 l-box">
				    	<h2>WORLD TOP</h2>
				    	<div class="score">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    	<div class="score marginTop">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    	<div class="score marginTop">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    </div>
				    <div class="pure-u-1-3 l-box">
				    	<h2>EUROPE TOP</h2>
				    	<div class="score">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    	<div class="score marginTop">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    	<div class="score marginTop">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    </div>
				    <div class="pure-u-1-3 l-box">
				    	<h2>FRANCE TOP</h2>
				    	<div class="score">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    	<div class="score marginTop">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    	<div class="score marginTop">
				    		<img src="images/avatar_example.png" alt="Avatar de test"/>
				    		<div>
				    			<h4>Pseudonyme Joueur</h4>
				    			<p>3587 points</p>
				    		</div>
				    	</div>
				    </div>
				</div> 
			</div>
			<div class="pure-g-r content">
				<div class="pure-u-1 alignCenter marginTop">
					<a href="#" class="btnLarge fsNormal">See other rankings</a>
				</div>
			</div>
		</section>
		<footer class="content">
			<div class="pure-g-r">
				 <div class="pure-u-1">
					<h3>Now on Buzzik</h3>
				</div>
			</div>

			<div class="pure-g-r orange marginTop">
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_player_hover.png" alt="Icone de joueur" />
			    	<p>
			    		Players online<br>
			    		<strong>4093</strong>
			    	</p>
			    </div>
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_multiple_user.png" alt="Icone de joueur" />
			    	<p>
			    		Registered players<br>
			    		<strong>4093</strong>
			    	</p>
			    </div>
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_headphone.png" alt="Icone de joueur" />
			    	<p>
			    		Musics<br>
			    		<strong>4093</strong>
			    	</p>
			    </div>
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_microphone.png" alt="Icone de joueur" />
			    	<p>
			    		Parties jouées<br>
			    		<strong>4093</strong>
			    	</p>
			    </div>
			</div>

			<div class="separation"></div>

			<div class="pure-g-r">
			    <div class="pure-u-1-3 ">
			    	<ul>
			    		<li><a href="">Our team</a></li>
			    		<li><a href="">Our partners</a></li>
			    		<li><a href="">About us</a></li>
			    		<li><a href="">Contact us</a></li>
			    	</ul>
			    </div>
			    <div class="pure-u-1-3 ">
			    	<ul>
			    		<li><a href="">Imprint</a></li>
			    		<li><a href="">Terms of Use</a></li>
			    		<li><a href="">Sitemap</a></li>
			    	</ul>
			    </div>
			    <div class="pure-u-1-3 ">
			    	<form>
			    		<input type="text" name="search" placeholder="Search..." />
			    		<input type="submit" name="submit" value="" />
			    	</form>
			    </div>
			</div>
		</footer>
		<section class="marginTop">
			<div class="pure-g-r content l-box">
				 <div class="pure-u-1">
					<p>Copyright 2013 - www.buzzik.fr - All Rights Reserved</p>
				</div>
			</div>
		</section>
	</section>	
	<script type="text/javascript" src="js/rafael.js"></script>
	<script type="text/javascript" src="js/pace.js"></script>
	<script src="http://cdn-files.deezer.com/js/min/dz.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript" src="http://buzzik.local:1337/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/buffer.js"></script>
	<script type="text/javascript" src="js/player.js"></script>
	<script type="text/javascript" src="js/room.js"></script>
	<script type="text/javascript" src="js/formulaire.js"></script>
	<script type="text/javascript" src="js/client.js"></script>
	<script type="text/javascript" src="js/actions.js"></script>
	<script>
	// Load the SDK asynchronously
	(function(d){
	 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement('script'); js.id = id; js.async = true;
	 js.src = "http://connect.facebook.net/fr_FR/all.js";
	 ref.parentNode.insertBefore(js, ref);
	}(document));
	</script>
</body>
</html>	