// Le support du dessin
	var diametre = $('#buffer').height();
	var rayonD = $('#divPlayer').height();

	if(rayonD%2 != 0)
		Math.floor(rayonD);
	else
		Math.ceil(rayonD);

	if(diametre%2 != 0)
		Math.floor(diametre);
	else
		Math.ceil(diametre);

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
	// Tracé  d'un arc élémentaire (deltaAngle) 
	function traceArcElem(currentTime){
	    //currentAngle-=deltaAngle;
	    currentAngle = alpha+360*currentTime*1000/30000;
	    // Calcul nouvelle position
	    currentXY=(+ox+rayon*Math.cos(currentAngle*Math.PI/180))+' '+(+oy+rayon*Math.sin(currentAngle*Math.PI/180));
	    // Tracé du chemin avec un M pour MoveTo déplacement en levant la plume
	    // et un L lineTO pour le tracé de l'arc
	    paper.path('M '+initXY+' L '+currentXY).attr({stroke:"#fff","stroke-width":4,"stroke-linecap":"butt"});
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

	/*var buffer = {

		params : {
			diametre : '',
			rayon : '',
			buffer : '',
			currentAngle : '',
			alpha : '-90',
			deltaAngle : '1',
			drawed : function(){}
		},

		init : function(options){
			this.property = $.extend(this.params, options);
			this.paper = Raphael("buffer",diametre,diametre);
			this.params.currentAngle = this.params.alpha;  
			this.initXY = (+diametre/2+this.params.rayon*Math.cos(this.params.currentAngle*Math.PI/180))+' '+(+diametre/2+this.params.rayon*Math.sin(this.params.currentAngle*Math.PI/180));
			this.currentXY = null;
		},

		draw : function(){
			this.params.currentAngle = this.params.alpha+360*currentTime*1000/30000;
			this.currentXY = (+diametre/2+this.params.rayon*Math.cos(this.params.currentAngle*Math.PI/180))+' '+(+diametre/2+this.params.rayon*Math.sin(this.params.currentAngle*Math.PI/180));
			this.paper.path('M '+this.initXY+' L '+this.currentXY).attr({stroke:"#fff","stroke-width":4,"stroke-linecap":"butt"});
			this.initXY = this.currentXY;
			this.property.drawed.call(this);

			if(this.params.currentAngle < -360) return false;

			return true;
		}
	}

	buffer.init({
		diametre : $('#buffer').height(),
		rayon : $('#divPlayer').height(),

		drawed : function(){
			console.log("drawed");	
		}
	});*/

	var player = {

		params : {
			audio : '#player',
			progress : '#progress',
			buffer : '#buffer',
			control : '#control',
			button : '#button',
			file : '',
			loaded : function(){},
			playing : function(){},
			pause : function(){},
			ended : function(){}
		},

		init : function(options){
			this.property = $.extend(this.params, options);
			this.media = $(this.property.audio)[0];
			this.media.src = this.params.file;
			console.log(this.media);
		},

		load : function(){
			this.media.load();
			$(this.media).on('canplaythrough', function(){
				player.property.loaded.call(this);
			});
		},

		play : function(){
			this.media.play();
			this.property.playing.call(this);
		},

		pause : function(){
			this.media.pause();
			this.property.pause.call(this);
		},

		end : function(){
			this.property.ended.call(this);
		},

		setFile : function(file){
			this.params.file = file;
			this.media.src = this.params.file;
		},

		clic : function(){
			console.log("click");
			var ter = this.media.paused?this.play():this.pause();
		}

	};

	var timer, decompte;

	player.init({
		file : 'http://cdn-preview-a.deezer.com/stream/a4e149e52e2ffdc4f057661b40ba7ee3-1.mp3',
		loaded : function(){
			console.log("loaded");
		},
		playing : function(){
			console.log("playing");

			timer = setInterval(function(){
					if(!traceArcElem(player.media.currentTime)){
						clearInterval(timer);
						clearInterval(decompte);
						player.end();
					}	
				}, 84);

			decompte = setInterval(function(){
				var timeLeft = 30-player.media.currentTime;
				if(timeLeft <= 5) $("#timer").addClass("caSentLaFin");
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
			clearInterval(timer);
			clearInterval(decompte);
			$("#timer").removeClass("caSentLaFin");
		},
		ended : function(){
			console.log("Terminé");
			$("#timer").removeClass("caSentLaFin");
			player.setFile("http://www.google.fr"); /* ICI NOUVEAU FICHIER */
			player.load();
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
	})

	$("#button.off span:first-of-type")