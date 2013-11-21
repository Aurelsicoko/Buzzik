var diametre = 190;
var rayonD = 178;

if(rayonD%2 != 0)
	rayonD = Math.floor(rayonD);
else
	rayonD = Math.ceil(rayonD);

if(diametre%2 != 0)
	diametre = Math.floor(diametre);
else
	diametre = Math.ceil(diametre);

var paper = Raphael("buffer"); 
paper.setViewBox(0,0,diametre,diametre,true);
paper.setSize('100%', '100%');
               
// coordonnées du centre
var ox=diametre/2,oy=diametre/2;
// Rayon, angle initial, angle actuel et mon pas (en degrés à convertir en radians)
var rayon=rayonD/2,alpha=-90,currentAngle,deltaAngle=1;
// Définition de la position initiale
currentAngle=alpha;
// la syntaxe (+ ) assure la conversion en nombres et l'addition avant la concatenation
var initXY=(+ox+rayon*Math.cos(currentAngle*Math.PI/180))+' '+(+oy+rayon*Math.sin(currentAngle*Math.PI/180));
// Position courante
var currentXY;

function traceArcElem(currentTime){
	    //currentAngle-=deltaAngle;
	    currentAngle = alpha+360*currentTime*1000/30000;
	    // Calcul nouvelle position
	    currentXY=(+ox+rayon*Math.cos(currentAngle*Math.PI/180))+' '+(+oy+rayon*Math.sin(currentAngle*Math.PI/180));
	    // Tracé du chemin avec un M pour MoveTo déplacement en levant la plume
	    // et un L lineTO pour le tracé de l'arc

	    paper.path('M '+initXY+' L '+currentXY).attr({stroke:"#ffffff","stroke-width":2,"stroke-linecap":"butt"});
	    // On repartira de la position atteinte
	    initXY=currentXY;
	    // et recommence tant que l'angle limite 30-180=>-150 degrés n'est pas atteint
	    
		if(currentAngle > 270){
			$("path").attr("stroke-width", 12);
			$("path").attr("stroke", "#933027");
			return false;
		} 

		return true;
	}

var timerPlayer, decompte;

player.init({
	file : '',
	loaded : function(){
		console.log("loaded");
	},
	playing : function(){
		console.log("playing");

		timerPlayer = setInterval(function(){
				if(!traceArcElem(player.media.currentTime)){
					clearInterval(timerPlayer);
					clearInterval(decompte);
					player.end();
				}	
			}, 84);

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
		socket.emit('musiqueFini');
	}
});

player.load();


$("#button").on('click', function(){ 
	player.clic(); 		
});

$(document).keydown(function(e){
	if(e.keyCode == 32)
		player.clic();
});

$(".titres span").click(function() {
  $(".titres").animate({ scrollTop: $(".titres").height() }, "slow");
  $(".titres span").hide("fast");
  return false;
});

$(".titres").scroll(function(){
	$(".titres span").hide("fast");
});