<html>
	<meta charset="utf8">
	<link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<body>
	<div id="dz-root"></div>
		<?php

		/*

		### STEP BY STEP

		1 -> Récupérer ID & email & générer adresse ROOM sans email pour qu'il est tous la même adresse
		2 -> Vérifier si email correspond à l'id
		3 -> Facebook Connect et on récupère nom, prenom, email, avatar, pays, age
		4 -> On l'inscrit dans notre BDD
		5 -> On associe notre user à la room (table jouer)
		6 -> Afficher buzzer associé à l'user (table personnaliser)

		### BONUS

		- Afficher un tableau des personnes connectés à la room (nécessite une modification de la table jouer pour avoir un champs actif)

		*/

			echo $id.' '.$email.'<br>http://localhost:8888/buzzik/party-'.$id.'.html';
		?>
	</body>
	<script src="http://localhost:1337/socket.io/socket.io.js"></script>
	<script>
	var socket = io.connect('http://localhost:1337');
  	var server = false;

  	var listMusiqueUrl = "";
  	var listMusiqueTitle = "";

	// Additional JS functions here
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '205528932959370', // App ID
	      status     : true, // check login status
	      cookie     : true, // enable cookies to allow the server to access the session
	      xfbml      : true  // parse XFBML
	    });

	    // Get url parameters
	    var parameters = window.location.pathname.split("-");
	    var idRoom = parameters[1];
	    var email = parameters[2].replace(".html", "");

	    $.ajax({
		  type: "POST",
		  url: "verifierParty.php",
		  data: { idRoom: idRoom, email: email}
		}).done(function( data ) {
				if(data == 1){
					// Continue, all is good
				    FB.getLoginStatus(function(response)
				  	{
					  	if(response.status === 'connected'){
						  // connected
						  FB.api('/me', function(userInfo) {
					        // Get all user informations
					        var emailUser = userInfo.email;
					        var prenomUser = userInfo.first_name;
					        var nomUser = userInfo.last_name;
					        var avatarUser = "http://graph.facebook.com/"+userInfo.username+"/picture";
					        var paysUser = userInfo.location.name.split(",")[1];
					        var ageUser = userInfo.birthday;

					        // If the user isn't subscribed, we subscribe him else we connect him
					        $.post("connect.php", { idRoom: idRoom, emailUser: emailUser, prenomUser: prenomUser, nomUser: nomUser, avatarUser: avatarUser, paysUser: paysUser, ageUser: ageUser }, function(data){
								data = eval('(' + data + ')');
								if(data.response == "ok" || data.response == "subscribe"){
									// Continue, we can show the buzzer
									data.buzzer = eval('(' + data.buzzer + ')');
									var nomBuzzer = data.buzzer.nomBuzzer;
									var sonnerieBuzzer = data.buzzer.sonnerieBuzzer;

									socket.emit('login', {username: $('#username').val()});

									$("body").append("<div id='buzzer' class='"+nomBuzzer+"'>"+sonnerieBuzzer+"</div>");
								}
								else{
									// There was a problem, stop the script
									return;
								}
					         });
					      });
					  	}else if(response.status === 'not_authorized'){
					  	// not_authorized
						  login();
					  	}else{
						  // not_logged_in
						  login();
							
					  	}
					});

					function login(_self) {
					    FB.login(function(response) {
					        if (response.authResponse) {
					            // connected
					        	FB.api('/me', function(userInfo) {
							        // Get all user informations
							        var emailUser = userInfo.email;
							        var prenomUser = userInfo.first_name;
							        var nomUser = userInfo.last_name;
							        var avatarUser = "http://graph.facebook.com/"+userInfo.username+"/picture";
							        var paysUser = userInfo.location.name.split(",")[1];
							        var ageUser = userInfo.birthday;

							        // If the user isn't subscribed, we subscribe him else we connect him
							        $.post("connect.php", { idRoom: idRoom, emailUser: emailUser, prenomUser: prenomUser, nomUser: nomUser, avatarUser: avatarUser, paysUser: paysUser, ageUser: ageUser }, function(data){
										data = eval('(' + data + ')');
										if(data.response == "ok" || data.response == "subscribe"){
											// Continue, we can show the buzzer
											data.buzzer = eval('(' + data.buzzer + ')');
											var nomBuzzer = data.buzzer.nomBuzzer;
											var sonnerieBuzzer = data.buzzer.sonnerieBuzzer;

											$("body").append("<div id='buzzer' class='"+nomBuzzer+"'>"+sonnerieBuzzer+"</div>");
										}
										else{
											// There was a problem, stop the script
											return;
										}
							         });
							    });
					        } else {
					            // cancelled
					        }
					    },{scope: 'email,user_birthday'});
					}

				}
				else{
					// Oups, there are a little problem this email isn't associated to this party
					document.location.href= "./" 
				}
			});

	    

  	};

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
	
	</script>
	<script src="http://cdn-files.deezer.com/js/min/dz.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/room.js"></script>
	<script type="text/javascript" src="js/formulaire.js"></script>
	<script type="text/javascript" src="js/client.js"></script>
	<script src="script.js" ></script>
</html>