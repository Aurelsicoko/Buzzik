var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


server.listen(1337);	

// liste des utilisateur
var usernames = new Array();

// liste des rooms disponible
var rooms = new Array();

// info musique
var numTrack;
var listMusiqueUrl = "";
var listMusiqueTitle = "";

var numRoom = 1;
var numUser = 1;

io.sockets.on('connection', function (socket) {
	
	socket.join('accueil');
	socket.emit('afficherLesRoomsExistante', rooms)

	socket.on('ajouterRoom', function (nomPartie, nbrJoueur, nbrChanson){
		var newRoom = {id: numRoom, nom: nomPartie, nbrJoueur: nbrJoueur, nbrChanson: nbrChanson, listeMusique: [], play: false, buzz: false};
        console.log('................... ' + nbrJoueur + ' ............ ' + nbrChanson);
        socket.room = numRoom;
        socket.numRoom = numRoom;
        rooms[socket.numRoom] = newRoom;
        socket.join(socket.room);
        socket.emit('roomAjoute');
        socket.broadcast.to('accueil').emit('afficherLesRoomsExistante', rooms);
        numRoom++;
	});

	socket.on('rejoindreRoom', function(room, nom){
        socket.emit('message', room);
		if (rooms[room] != null) {
            var nbrPlayerPartie = 0;
            for (k in usernames) {
                    if (usernames[k].room == rooms[room].id) {
                            nbrPlayerPartie++;
                    }
            }
            console.log('.....................' + nbrPlayerPartie + '...................' +rooms[room].nbrJoueur);
            if (nbrPlayerPartie < rooms[room].nbrJoueur) {
                    socket.join(room);
                    socket.room = room;
                    socket.numUser = numUser;
                    usernames[socket.numUser] = {
                            id : numUser,
                            user : nom,
                            point : 0,
                            room : rooms[room].id
                    };
                    socket.emit('roomRejoin');
                    socket.broadcast.to(socket.room).emit('refreshScrore');
                    numUser++;
            }else{
                    socket.emit('message', 'La partie est pleine');
            }
	    }else{
	            socket.emit('message', 'cette room n\'existe pas');
	    }
	});

	socket.on('playerPret', function(infoTrack){
            listMusiqueUrl = infoTrack.url;
            listMusiqueTitle = infoTrack.title;
            numTrack = Math.floor((Math.random()*(listMusiqueTitle.length-1))+1);
            console.log(listMusiqueTitle[numTrack]);
            rooms[socket.room].listeMusique.push(numTrack);
            rooms[socket.room].musiqueCourante = listMusiqueTitle[numTrack];
            socket.emit('prochaineMusique', listMusiqueUrl[numTrack], 'pause');
    });

    socket.on('debutPartie', function (){
            rooms[socket.room].play = true;
    });

    socket.on('musiqueFini', function(){
            numTrack = Math.floor((Math.random()*(listMusiqueUrl.length-1))+1);
            console.log(listMusiqueTitle[numTrack])
            socket.emit('prochaineMusique', listMusiqueUrl[numTrack], 'play');
    });

    socket.on('buzz', function() {
            if (!rooms[socket.room].buzz && !rooms[socket.room].paused) {
                    rooms[socket.room].buzz = true;
                    socket.broadcast.to(socket.room).emit('buzz');
                    socket.emit('valideBuzz');
            }
            rooms[socket.room].play = false;
    });

    socket.on('reponse', function(reponse){
            rooms[socket.room].buzz = false;
            rooms[socket.room].play = true;
            console.log(rooms[socket.room].buzz, rooms[socket.room].id);
            if(reponse.toLowerCase()  == rooms[socket.room].musiqueCourante.toLowerCase() ){
                    if (rooms[socket.room].listeMusique.length != rooms[socket.room].nbrChanson) {
                            do {
                                    numTrack = Math.floor((Math.random()*(listMusiqueUrl.length-1))+1);
                                    verif = Verif(numTrack, rooms[socket.room].listeMusique);
                            }while(verif);
                            rooms[socket.room].listeMusique.push(numTrack);
                            console.log(listMusiqueTitle[numTrack]);
                            rooms[socket.room].musiqueCourante = listMusiqueTitle[numTrack];
                            usernames[socket.numUser].point += 100;
                            io.sockets.to(socket.room).emit('afficherJoueur', usernames, socket.room);
                            io.sockets.to(socket.room).emit('prochaineMusique', listMusiqueUrl[numTrack], 'play');
                    }else{
                            usernames[socket.numUser].point += 100;
                            io.sockets.to(socket.room).emit('message', 'Fin de la partie');

                    }
                    
            }else{
                    io.sockets.to(socket.room).emit('afficheBuzzer');
            }
    });

    socket.on('refreshScrore', function () {
            socket.emit('afficherJoueur', usernames, socket.room, socket.numUser);
    });

    socket.once('disconnect', function () {
            if (socket.numUser != '') {
                    delete usernames[socket.numUser];
                    socket.broadcast.to(socket.room).emit('refreshScrore');
            }
            if (socket.numRoom != '') {
                    delete rooms[socket.numRoom];
                    socket.broadcast.to(socket.room).emit('roomDelete');
                    io.sockets.to('accueil').emit('afficherLesRoomsExistante', rooms)
            }
    });

    function Verif(a, liste){
            var x = 0;
            while(x < liste.length){
                    if(liste[x] == a){
                            return true;
                    }
                    x++;
            }
    }


});