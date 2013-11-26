var buffer = {

	params : {
		diametre : '',
		rayon : '',
		buffer : '',
		currentAngle : '',
		alpha : -90,
		deltaAngle : 1,
		drawed : function(){},
		ended : function(){}
	},

	init : function(options){
		this.property = $.extend(this.params, options);

		if(this.params.rayon%2 != 0)
			this.params.rayon = Math.floor(this.params.rayon);
		else
			this.params.rayon = Math.ceil(this.params.rayon);

		if(this.params.diametre%2 != 0)
			this.params.diametre = Math.floor(this.params.diametre);
		else
			this.params.diametre = Math.ceil(this.params.diametre);

		this.paper = Raphael("buffer");
		console.log("Diamètre:"+this.params.diametre);
		this.paper.setViewBox(0,0, this.params.diametre, this.params.diametre, true);
		this.paper.setSize('100%', '100%');

		this.params.currentAngle = this.params.alpha;  
		this.initXY = (+(this.params.diametre/2)+this.params.rayon/2*Math.cos(this.params.currentAngle*Math.PI/180))+' '+(+(this.params.diametre/2)+this.params.rayon/2*Math.sin(this.params.currentAngle*Math.PI/180));
		this.currentXY = null;
	},

	draw : function(currentTime){
		this.params.currentAngle = this.params.alpha+(360*currentTime*1000/30000);
		this.currentXY=(+(this.params.diametre/2)+this.params.rayon/2*Math.cos(this.params.currentAngle*Math.PI/180))+' '+(+(this.params.diametre/2)+this.params.rayon/2*Math.sin(this.params.currentAngle*Math.PI/180));

		//this.currentXY = (+this.params.diametre/2+this.params.rayon*Math.cos(this.params.currentAngle*Math.PI/180))+' '+(+this.params.diametre/2+this.params.rayon*Math.sin(this.params.currentAngle*Math.PI/180));
		if(this.params.currentAngle > 270){
			$("path").attr("stroke-width", 12);
			$("path").attr("stroke", "#933027");
			this.property.ended.call(this);
			return false;
		}
		else{
			this.paper.path('M '+this.initXY+' L '+this.currentXY).attr({stroke:"#fff","stroke-width":2,"stroke-linecap":"butt"});
			this.initXY = this.currentXY;
			this.property.drawed.call(this);
		}		
	}
}