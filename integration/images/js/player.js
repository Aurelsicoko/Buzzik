// Le support du dessin
	// Tracé  d'un arc élémentaire (deltaAngle) 
	

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
