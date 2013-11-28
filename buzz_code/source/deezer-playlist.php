	<html>
<head>
	<title></title>
</head>
<body onload="GetPlayList(listMusiqueUrl, listMusiqueTitle)" >

<div id="dz-root"></div>
<script src="http://cdn-files.deezer.com/js/min/dz.js"></script>
<script>
var listMusiqueUrl = "";
var listMusiqueTitle = "";

function GetPlayList(a, b){
	playListUrl = a.split(',');
	playListTitle = b.split(',');
	document.write(playListUrl[5]);
	document.write("<br>"+playListTitle[5]);

	document.write('<audio id="player" src="'+playListUrl[5]+'"></audio>');
	document.getElementById('player').volume=0.1;
	document.write('<button onclick="document.getElementById(\'player\').play()">Play</button>');
	document.write('<button onclick="document.getElementById(\'player\').pause()">Pause</button>');
	document.write('<button onclick="document.getElementById(\'player\').volume-=0.1">Volume -</button>');
	document.write('<button onclick="document.getElementById(\'player\').volume+=0.1">Volume +</button>');

}

function GetUrlObjet(o) {
    for (i in o) {
        if (typeof(o[i])=="object") {
        	console.log(o[i].preview);
        	console.log(o[i].title);
            listMusiqueUrl = listMusiqueUrl + "," + o[i].preview;
            listMusiqueTitle = listMusiqueTitle + "," + o[i].title;
        }
    }
}

DZ.init({
	appId : '125515',
	channelUrl : 'http://web-infocom.fr/hetic/htmlcss',
	player : {
		onload : function(){}
	}
});

DZ.api('playlist/589406715', function(response){
	console.log(response.tracks.data);
	GetUrlObjet(response.tracks.data);
});

</script>
</body>
</html>