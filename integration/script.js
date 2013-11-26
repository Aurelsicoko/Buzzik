$(document).ready(function(){

	var nomPartie, nbrChanson;

	// Création de ROOM
	$("#btnCreerRoom").click(function(){
		$("#btnCreerRoom").hide();
		$("#reglages").append("<h2>Réglages de la partie</h2>");
		$("#reglages").append("<input type='text' placeholder='Nom de la partie' name='nomPartie' required /><br><br>");
		$("#reglages").append("<b>Nombre de chansons ?</b><br><input type='text' id='amount' style='border: 0;  font-weight: bold;' /><br><div id='nbrChanson'></div>");
		$("#reglages").append("<br><br><b>Nombre de joueur ?</b><br><div id='choisirNbrJoueur'></div><br>");
		$( "#nbrChanson" ).slider({
	      range: "min",
	      value: 15,
	      min: 5,
	      max: 50,
	      slide: function( event, ui ) {
	        $( "#amount" ).val(ui.value);
	      }
	    });
	    $( "#amount" ).val($( "#nbrChanson" ).slider( "value" ) + " chansons");
		$("#choisirNbrJoueur").load("template/choisirNbrJoueur.html", function(){
			choisirNbrJoueur();
		});	
	});

	function envoyerInvitation(){
		
		alert("Invitations envoyées &  room créée !");
		var data = new Array();
		var theInput = $("#saisirEmailJoueur input[type=email]");

		for(var i=0; i<theInput.length; i++){
			data.push(theInput[i].value);
		}
		
		// Envoyer les emails à PHP pour envoyer les mails
	}

	function creerRoom(nbrJoueur){
		$("#reglages").hide();

		$.ajax({
		  type: "POST",
		  url: "creerRoom.php",
		  data: { nbrJoueur: nbrJoueur, nomPartie: nomPartie, nbrChanson: nbrChanson}
		}).done(function( data ) {
		    	var link = "http://localhost:8888/buzzik/party-"+data+"-aurelsicoko@gmail.com.html";
		    	$('body').append("<br>Lien de la room : <a href='"+link+"'>"+link+"</a>");
			});

		alert("Créér une room de "+nbrJoueur+" joueur(s) au nom de "+nomPartie+" sur "+nbrChanson+" chansons !");

		for(var i=0; i<nbrJoueur; i++){
			$("#saisirEmailJoueur").append("<input type='email' placeholder='Email joueur n°"+(i+1)+"' alt='"+i+"' /><br>");
		}

		$("#saisirEmailJoueur").append("<input type='button' id='envoyerInvitation' value='Envoyer les invitations' />");

		$("#envoyerInvitation").click(envoyerInvitation);
	}

	function choisirNbrJoueur(){

		$("#choisirNbrJoueur img").hover(function(){
			var obj = $(this);
			var alt = obj.attr('alt');
			var src = obj.attr('src');

			var tab = src.split("/"),
				url = "";

			for(var i=0; i<tab.length-1; i++){
				url += tab[i]+"/";
			}

			src = tab[tab.length-1];

			var theImg = $("#choisirNbrJoueur img");
			for(var i=0; i<=alt; i++){
				theImg[i].src = url+"playerYes.png";
			}

			for(var w=i; w<theImg.length; w++){
				theImg[w].src = url+"playerNo.png";
			}

		});

		$('#choisirNbrJoueur').mouseleave(function(){
			var obj = $(this);
			var src = obj.find("img").attr('src');

			var tab = src.split("/"),
				url = "";

			for(var i=0; i<tab.length-1; i++){
				url += tab[i]+"/";
			}

			var theImg = $("#choisirNbrJoueur img");
			for(var i=0; i<theImg.length; i++){
				theImg[i].src = url+"playerNo.png";
			}	
		});

		$("#choisirNbrJoueur img").click(function(){
			var obj = $(this);
			var alt = parseInt(obj.attr('alt'))+1;

			$("#choisirNbrJoueur img").unbind('mouseenter').unbind('mouseleave');
			$("#choisirNbrJoueur").unbind("mouseleave");
			$("#choisirNbrJoueur img").unbind("click");

			nomPartie = $("input[name=nomPartie]").val();
			nbrChanson = $("#amount").val();

			$("body").append("<div id='saisirEmailJoueur'></div>");
			creerRoom(alt);
		});
	}
		
});