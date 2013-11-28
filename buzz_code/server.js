var http = require('http');
var md5 = require('md5');

httpServer = http.createServer(function(req, res){
	res.end();
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

var users = {};
var server = false;
var numTrack;
var listMusiqueUrl = "";
var listMusiqueTitle = "";

io.sockets.on('connection', function(socket){
	var me = false;

	//Affichage des utilisateurs connectés
	for(var k in users){
		socket.emit('newusr', users[k]);
	}

	//Ecoute du remplissage du formulaire de connexion
	socket.on('login', function(user){
		var nbusr = 0;
		for(var k in users){
			nbusr++;
		}
		console.log(nbusr);
		me = user;
		me.id = me.username;
		//Si premier connecté donc serveur SINON joueur
		if(server){
			//Envoie la socket disant que c'est un joueur
			socket.emit('loggedUsr');
			users[me.id] = me;
			//J'indique que je vien d'arriver à tous le monde
			io.sockets.emit('newusr', me);
		}else{
			//Envoie la socket disant que c'est un serveur
			socket.emit('loggedServ');
			//Je suis le server
			server = true;
			me.serv = true;
		}
		
	});

	socket.on('initInfoTrack', function(infoTrack){
		listMusiqueUrl = infoTrack.url;
		listMusiqueTitle = infoTrack.title;
		console.log(infoTrack.title);
		numTrack = Math.floor((Math.random()*(listMusiqueTitle.length-1))+1); 
		console.log(listMusiqueTitle[numTrack]);
		socket.emit('initNextTrack', listMusiqueUrl[numTrack]);
	});

	//Ecoute lors d'un buzz
	socket.on('buzz', function(){
		//Envoie à tout le monde qu'il y a un buzz
		socket.broadcast.emit('newbuzz', me.username);
		//Envoie l'info que le joueur à buzzé
		socket.emit('ibuzz');
	});

	socket.on('newreponse', function(reponse){
		console.log(reponse.title);
		console.log(listMusiqueTitle[numTrack]);
		if(reponse.title == listMusiqueTitle[numTrack]){
			numTrack = Math.floor((Math.random()*(listMusiqueUrl.length-1))+1); 
			console.log(numTrack);
			console.log(listMusiqueTitle[numTrack])
			io.sockets.emit('initbuzz');
			io.sockets.emit('nextTrack', listMusiqueUrl[numTrack]);
		}else{
			io.sockets.emit('initbuzz');
		}
	});

	//Ecoute btn retour
	socket.on('bbuzz', function(){
		//Envoie l'info de init le buzzer
		io.sockets.emit('initbuzz');
	});

	//Ecoute la deconnection
	socket.on('disconnect', function(){
		//Si c'est pas moi , je ne fais rien
		if(!me){
			return false;
		}
		//Si je suis le serv, je dit qu'il n'y a plus de server
		if(me.serv){
			server = false;
		}
		//Je suprime mon utilisateur
		delete users[me.id];
		//J'indique à tout le monde que je suis parti
		io.sockets.emit('signout', me);
	});
});