<!DOCTYPE>
<html>
<head>
	<meta charset="utf8">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<title>Buzzik - Open your mind</title>
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
				    	<h1>Buzzik, le nouveau blind-test innovant !</h1>
				    	<p class="justify">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed consequat nulla, id varius dolor. Aliquam erat volutpat. 
						In vitae posuere nisl. Sed vitae nibh eget urna interdum tristique.
						</p> 
						
						<p class="justify">
						Nam ultrices diam purus, sed fringilla neque mattis vitae. In faucibus, libero nec tempus dapibus, neque ligula iaculis elit,
						id pretium est tortor eget sapien. Duis non aliquet turpis, id egestas metus.
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
					<h2 class="h2titleDivision">COMMENT JOUER</h2>
				</div>
			</div>

			<div class="pure-g-r">

			    <div class="pure-u-1-2 video-container l-box">
			    	<!-- <iframe src="http://www.youtube.com/embed/LHVJumOSCyE" frameborder="0" width="540" height="315"></iframe> -->
			    </div>
			    <div class="pure-u-1-2 regleDuJeu l-box">
				    	<h2>REGLES DU JEU</h2>
				    	<ul>
				    		<li><img src="./images/icon_player_hover.png" /></li>
				    		<li>DE 1 à 4 JOUEURS</li>
				    		<li><img src="./images/icon_smartphone.png" /> </li>
				    		<li>4 SMARTPHONES</li>
				    		<li><img src="./images/icon_computer.png" /></li>
				    		<li>1 ORDINATEUR</li>
				    	</uL>
			    </div>

			</div>
		</section>
		<section id="jouer" class="content">
			<div class="pure-g-r">
				 <div class="pure-u-1 titleDivision">
					<h2 class="h2titleDivision">A TOI DE JOUER</h2>
				</div>
			</div>

			<div class="pure-g-r">

			    <div class="pure-u-1-2 regleDuJeu l-box">
					<h2>JOUER EN SOLO</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed consequat nulla, id varius dolor. Aliquam erat volutpat. In vitae posuere nisl. Sed vitae nibh eget urna interdum tristique. Nam ultrices diam purus, sed fringilla neque mattis vitae.
					</p>
					<div class="pure-g-r">
						<div class="pure-u-1-2">
							<p class="orange fsNormal alignCenter marginTop">
								<img class="verticalAlignMiddle" src="images/icon_multiple_user.png" alt="Des milliers de joueurs" /> 1500 joueurs
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
						 	<a href="#" class="btnLarge fsNormal">Commencer la partie !</a>
						</div>
					</div>
			    </div>
			    <div class="pure-u-1-2 regleDuJeu l-box" id="reglages">
					<h2>JEU MULTIJOUEURS</h2>
					<div class="pure-g-r">
						<div class="pure-u-1">
							<input type='text' class="marginBottomSmall" placeholder='Saisir le nom de la partie...' name='nomPartie' required />
						</div>
						<div class="pure-u-1" id="choisirNbrJoueur" data-nbrjoueur="0">

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
						 	<a href="#multiple_player" class="btnLarge fsNormal">Commencer la partie !</a>
						</div>
					</div>
			    </div>

			</div>
		</section>
		<section class="top marginTop">
			<div class="pure-g-r content">
				 <div class="pure-u-1 titleDivision">
					<h2 id="h2titleDivision">COMMUNAUTE</h2>
				</div>
			</div>

			<div class="pure-g-r content">
				    <div class="pure-u-1-3 l-box">
				    	<h2>TOP MONDE</h2>
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
				    	<h2>TOP EUROPE</h2>
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
				    	<h2>TOP FRANCE</h2>
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
					<a href="#" class="btnLarge fsNormal">Voir les autres classements</a>
				</div>
			</div>
		</section>
		<footer class="content">
			<div class="pure-g-r">
				 <div class="pure-u-1">
					<h3>En ce moment sur Buzzik</h3>
				</div>
			</div>

			<div class="pure-g-r orange marginTop">
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_player_hover.png" alt="Icone de joueur" />
			    	<p>
			    		Joueurs en ligne<br>
			    		<strong>4093</strong>
			    	</p>
			    </div>
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_multiple_user.png" alt="Icone de joueur" />
			    	<p>
			    		Nombre d'inscrits<br>
			    		<strong>4093</strong>
			    	</p>
			    </div>
			    <div class="pure-u-1-4 ">
			    	<img src="images/icon_headphone.png" alt="Icone de joueur" />
			    	<p>
			    		Nombre de musiques<br>
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
			    		<li><a href="">L'équipe</a></li>
			    		<li><a href="">Nos partenaires</a></li>
			    		<li><a href="">A propos</a></li>
			    		<li><a href="">Contactez-nous</a></li>
			    	</ul>
			    </div>
			    <div class="pure-u-1-3 ">
			    	<ul>
			    		<li><a href="">Mentions légales</a></li>
			    		<li><a href="">Conditions d'utilisation</a></li>
			    		<li><a href="">Plan du site</a></li>
			    	</ul>
			    </div>
			    <div class="pure-u-1-3 ">
			    	<form>
			    		<input type="text" name="search" placeholder="Rechercher..." />
			    		<input type="submit" name="submit" value="" />
			    	</form>
			    </div>
			</div>
		</footer>
		<section class="marginTop">
			<div class="pure-g-r content l-box">
				 <div class="pure-u-1">
					<p>Copyright 2013 - www.buzzik.fr - Tous droits réservés</p>
				</div>
			</div>
		</section>
	</section>	
	<script type="text/javascript" src="js/rafael.js"></script>
	<script type="text/javascript" src="js/pace.js"></script>
	<script src="http://cdn-files.deezer.com/js/min/dz.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript" src="http://<?php echo $_SERVER['HTTP_HOST']; ?>:1337/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/player.js"></script>
	<script type="text/javascript" src="js/room.js"></script>
	<script type="text/javascript" src="js/formulaire.js"></script>
	<script type="text/javascript" src="js/client.js"></script>
	<script>
	$("#choisirNbrJoueur img").click(function () {
		
		console.log(room.params.nbrJoueur);
	});

	$('a[href=#multiple_player]').on('click', function(e){
		e.preventDefault();
		room.params.nomPartie = $("#reglages input[name=nomPartie]").val();
		room.params.nbrJoueur = parseInt($("#choisirNbrJoueur").data("nbrjoueur"));
		room.params.nbrChanson = parseInt($("#reglages #amount2").val());

		room.creerRoom();
	});


	$('a[href=#jouer]').on('click', function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: $("#jouer").offset().top},'slow');
	});

	$('a[href=#connecter]').on('click', function(e){
		e.preventDefault();
		var div = $('.topBar ul:last-of-type');
		if(div.attr('class') == 'off' || div.attr('class') == 'animated bounceOutUp'){
			div.addClass('animated').addClass('bounceInDown').removeClass('off').removeClass('bounceOutUp');
		}
		else{
			div.addClass('bounceOutUp').removeClass('display').removeClass('bounceInDown');
		}
		var largeurPage = (document.body.clientWidth);
		var offset = $(this).parent().prev().children().offset();
		var pourcentage = offset.left*100/largeurPage;

		div.css({left:pourcentage+"%"});
	});


	$( "#nbrChanson" ).slider({
	      range: "min",
	      value: 15,
	      min: 5,
	      max: 50,
	      slide: function( event, ui ) {
	        $( "#amount" ).val(ui.value);
	      }
	});
	$( "#amount" ).val($( "#nbrChanson" ).slider( "value" ));
	</script>
	<script>
		$('#all').on('click','#buzzer', function(e){
			e.preventDefault();
			room.emitBuzz();
			console.log("emit");
		});

		function mancheCss(){
			var h = $('.bottom .manche').height();
			var m = $('.bottom .manche h2').height();
			var c = (h-m)/2-1;
			$('.bottom .manche h2').css({"padding-top":c+"px"});
		}

		function categorieCss(){
			var h = $('.bottom .bg_bottom').height()-$('.bottom .manche').height();
			var c = $('.bottom .categorie').height();

			var r = (h-c)/2;
			$('.bottom .categorie').css({"padding-top":r+"px"});
		}

		$( window ).resize(function() {
			mancheCss();
			categorieCss();
		});
		
		mancheCss();
		categorieCss();
		</script>
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