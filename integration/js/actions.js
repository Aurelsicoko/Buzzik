var timerPlayer, decompte;

jQuery(document).on("chargementJeu", function (evt) {

	buffer.init({
		diametre : 190,
		rayon : 178,

		drawed : function(){
		},

		ended : function(){
			// Lorsque le buffer est arrivé à la fin, on stoppe la musique !
			clearInterval(timerPlayer);
			clearInterval(decompte);
			player.end();
		}
	});

	player.init({
		initied : function(){
			// Ajout des evt pour lancer le player
			$("#button").on('click', function(event){
				player.clic(); 		
			});
			console.log("ajout click")

			$(document).keydown(function(e){
				if(e.keyCode == 32)
					player.clic();
			});
			console.log("ajout keydown");
		},
		loaded : function(){
			console.log("loaded");
		},
		playing : function(){
			console.log("playing");

			// Toutes les  84 ms ont mets à jour la position du curseur
			timerPlayer = setInterval(function(){
					buffer.draw(player.media.currentTime);
				}, 84);

			// Toutes les 100ms, on décrémente le compteur
			decompte = setInterval(function(){
				var timeLeft = 30-player.media.currentTime;
				if(timeLeft <= 5) $("#timer").addClass("caSentLaFin");
				if(timeLeft == 0) player.end();
				$("#timer").html(timeLeft.toFixed(1)+'"');
			}, 100);

			$(player.property.audio).removeClass('play');
			$(player.property.button).removeClass('off');
			$(player.property.button).addClass("playing");
		},
		pause : function(){
			console.log("pause");
			$(player.property.audio).addClass('play');
			$(player.property.button).addClass('off');
			$(player.property.button).removeClass("playing");
			clearInterval(timerPlayer);
			clearInterval(decompte);
			$("#timer").removeClass("caSentLaFin");
		},
		ended : function(){
			console.log("Terminé");
			$("#timer").removeClass("caSentLaFin");
			$("#timer").html('0');
			setTimeout(function(){
				socket.emit('musiqueFini');
			}, 1000);
			
		}
	});

	player.load();


	// Animation du cadre comportant les titres pour inciter à scroller dedans
	$(".titres span").click(function() {
	  $(".titres").animate({ scrollTop: $(".titres").height() }, "slow");
	  $(".titres span").hide("fast");
	  return false;
	});

	$(".titres").scroll(function(){
		$(".titres span").hide("fast");
	});

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