var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


var timerSong;


server.listen(1337);	

// liste des utilisateur
var usernames = new Array();

// liste des rooms disponible
var rooms = new Array();

// info musique
var numTrack;
var listMusiqueUrl = "";
var listMusiqueTitle = "";
var listMusiqueArtist = "";
var listMusiqueCover = "";

// compteur
var numRoom = 1;
var numUser = 1;

// Action à effectuer lors de la connection
io.sockets.on('connection', function (socket) {
	
    // Ajout à la room 'accueil' et affichage des rooms existante
	socket.join('accueil');
	socket.emit('afficherLesRoomsExistante', rooms)

    // Création de la room (STRING, INT, INT)
    // créé un nouvel obj room
    // mise en session du num de la room
    // ajout de l'obj room à la liste des rooms
    // ajout à la room céé
    // envoie à l'utilisateur qu'il vient de créer un room
    // envoie aux utilisateurs qui n'ont pas rejoin de partie, qu'une nouvelle vien d'être créé 
	socket.on('ajouterRoom', function (nomPartie, nbrJoueur, nbrChanson, listeEmails){
		var newRoom = {id: numRoom, nom: nomPartie, nbrJoueur: nbrJoueur, nbrChanson: nbrChanson, listeMusique: [], play: false, buzz: true};
        socket.room = numRoom;
        socket.numRoom = numRoom;
        rooms[socket.numRoom] = newRoom;
        socket.join(socket.room);

        /* Envoi des emails aux personnes */
        socket.emit('roomAjoute', { idRoom : socket.numRoom, listeEmails : listeEmails });
        socket.broadcast.to('accueil').emit('afficherLesRoomsExistante', rooms);
        numRoom++;
	});

    // Rejoindre une room (INT, STRING)
    // test si la room que l'on essaye de rejoindre existe
    // test si la room est libre
        // calcul du nombre d'utilisateur lié à la room
    // au 'oui' aux deux tests alors ajout d'un utilisateur à la liste des utilisateurs
    // ajout à la room
    // mise en sesion du num de la room
    // envoie à l'utilisateur qu'il vient de se connecter
    // envoie au utilisateur de la room qu'un nouvel utilisateur vient de se connecter
    // si 'non' à un des test, message d'erreur
	socket.on('rejoindreRoom', function(room, nom){
		if (rooms[room] != null) {
            var nbrPlayerPartie = 0;
            for (k in usernames) {
                    if (usernames[k].room == rooms[room].id) {
                            nbrPlayerPartie++;
                    }
            }
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

    // Player est prêt à être lancé (ARRAY)
    // récupération des infos des musique (mp3, titre, artiste, image)
    // selection de la première musique - aléatoire entre 1 et le nonbre de musique de la playlist
    // ajoute l'information à la room de la musique courante et que cette musique à été joué
    // envoie l'info de la musique choisi à l'utilisateur
	socket.on('playerPret', function(infoTrack){
        listMusiqueUrl = infoTrack.url;
        listMusiqueTitle = infoTrack.title;
        listMusiqueArtist = infoTrack.artist;
        listMusiqueCover = infoTrack.cover;
        numTrack = Math.floor((Math.random()*(listMusiqueTitle.length-1))+1);
        rooms[socket.room].listeMusique.push(numTrack);
        rooms[socket.room].musiqueCourante = listMusiqueTitle[numTrack];
        socket.emit('prochaineMusique', listMusiqueUrl[numTrack], 'pause');
        rooms[socket.room].timer = 0;
    });

    // Début de partie
    // active le fait de pouvoir buzzer
    socket.on('debutPartie', function (){
        rooms[socket.room].play = true;
        rooms[socket.room].buzz = false;
        timerSong =  setInterval(function(){
            rooms[socket.room].timer += 0.1;
        }, 100);
    });

    // Met en pause la partie
    // désactive le fait de pouvoir buzzer
    socket.on('pausePartie', function (){
        rooms[socket.room].play = false;
        rooms[socket.room].buzz = true;
        clearInterval(timerSong);
    });
    // Fin automatique de la musique si elle n'a pas été trouvé
    // test si il y a encore une musique à jouer pour la partie
    // si 'oui'
        // ajout de la musique fini à la liste des musiques jouées
        // envoie au player d'actualiser l'affichage des musiques jouées

        // choisir une nouvelle musique qui n'a pas été joué
        // ajout de la nouvelle musique à la liste des musiques jouées
        // ajout de la nouvelle musique courante à la room
        // envoie au player de charger la nouvelle musique
    //si 'non'
        // envoie aux utilisateur de la room que la partie est terminé
    socket.on('musiqueFini', function(){
        if (rooms[socket.room].listeMusique.length != rooms[socket.room].nbrChanson) {
            var listesInfos = new Array();
            for (l = 0 ; l < rooms[socket.room].listeMusique.length ; l++) {
                listesInfos[l] = {
                    cover: listMusiqueCover[rooms[socket.room].listeMusique[l]],
                    artist: listMusiqueArtist[rooms[socket.room].listeMusique[l]],
                    title: listMusiqueTitle[rooms[socket.room].listeMusique[l]]
                };
            }

            io.sockets.to(socket.room).emit('refreshListesInfos', listesInfos);
            do {
                numTrack = Math.floor((Math.random()*(listMusiqueUrl.length-1))+1);
                verif = Verif(numTrack, rooms[socket.room].listeMusique);
            }while(verif);
            rooms[socket.room].listeMusique.push(numTrack);
            rooms[socket.room].musiqueCourante = listMusiqueTitle[numTrack];
            io.sockets.to(socket.room).emit('prochaineMusique', listMusiqueUrl[numTrack], 'play');
            rooms[socket.room].timer = 0;
        }else{
                io.sockets.to(socket.room).emit('roomDelete');

        }
    });

    // Reception d'un buzz
    // test si un utilisateur à pas déjà buzzé
    // si 'oui'
        // ne rien faire
    // si 'non'
        // bloquer le buzzer
        // envoie aux autres utilisateur qu'un utilisateur à buzzé
        // envoie à l'utilisateur qu'il a bien buzzé
    socket.on('buzz', function() {
        if (!rooms[socket.room].buzz && rooms[socket.room].play) {
            rooms[socket.room].buzz = true;
            rooms[socket.room].play = false;
            socket.broadcast.to(socket.room).emit('buzz');
            socket.emit('valideBuzz');
        }
    });

    // Reception d'une réponse
    // réactiver le buzzer
    // test entre la réponse et le titre de la musique courante
    // si 'oui'
        // test si c'est la dernière musique
        // si 'non'
            // ajout de la musique fini à la liste des musiques jouées
            // envoie au player d'actualiser l'affichage des musiques jouées

            // choisir une nouvelle musique qui n'a pas été joué
            // ajout de la nouvelle musique à la liste des musiques jouées
            // ajout de la nouvelle musique courante à la room
            // ajout des points a l'utilisateur
            // envoie aux utilisateur de réactualiser les scores
            // envoie au player de charger la nouvelle musique
        // si 'oui'
            // ajout des points
            // envoie un alert de fin de partie 
            // envoie le fait que la room se delete
    // si 'non'
        // réaficher les buzzer
    socket.on('reponse', function(reponse){
        rooms[socket.room].buzz = false;
        rooms[socket.room].play = true;

        var pourcentage = compareStr(reponse, rooms[socket.room].musiqueCourante); 
        if(pourcentage >= 70){ // Si la réponse est à 70% exacte
            if (rooms[socket.room].listeMusique.length != rooms[socket.room].nbrChanson) {
                
                var listesInfos = new Array();
                for (l = 0 ; l < rooms[socket.room].listeMusique.length ; l++) {
                    listesInfos[l] = {
                        cover: listMusiqueCover[rooms[socket.room].listeMusique[l]],
                        artist: listMusiqueArtist[rooms[socket.room].listeMusique[l]],
                        title: listMusiqueTitle[rooms[socket.room].listeMusique[l]]
                    };
                }

                io.sockets.to(socket.room).emit('refreshListesInfos', listesInfos);
                do {
                    numTrack = Math.floor((Math.random()*(listMusiqueUrl.length-1))+1);
                    verif = Verif(numTrack, rooms[socket.room].listeMusique);
                }while(verif);
                rooms[socket.room].listeMusique.push(numTrack);
                rooms[socket.room].musiqueCourante = listMusiqueTitle[numTrack];

                usernames[socket.numUser].point += Math.ceil(100-(50/(30/rooms[socket.room].timer)));
                io.sockets.to(socket.room).emit('refreshScrore');
                io.sockets.to(socket.room).emit('prochaineMusique', listMusiqueUrl[numTrack], 'play');
                rooms[socket.room].timer = 0;
            }else{
                usernames[socket.numUser].point += Math.ceil(100-(50/(30/rooms[socket.room].timer)));
                io.sockets.to(socket.room).emit('message', 'Fin de la partie');
                io.sockets.to(socket.room).emit('roomDelete');

            }
                
        }else{
                io.sockets.to(socket.room).emit('afficheBuzzer');
        }
    });

    // Envoie des infos de partie
    // envoie des infos de la partie à l'urilisateur
    socket.on('refreshScrore', function () {
            socket.emit('afficherJoueur', usernames, socket.room, socket.numUser);
    });

    // Deconnection
    // si un utilisateur
        // rejoindre la room accueil
        // supression de l'utilisateur de la liste des utilisateurs
        // supression de sa variable de session 
        // envoie aux utilisateur de refresh les scores
    // si une room
        // rejoindre la room accueil
        // supression de la room de la liste des rooms
        // envoie aux utilisateur de la room qu'elle à était suprimmer
        // envoie à la room accueil d'actualiser les rooms existentes
    socket.on('disconnect', function () {
        console.log(socket);
            if (socket.numUser != undefined) {
                    socket.join("accueil");
                    delete usernames[socket.numUser];
                    socket.numUser = undefined;
                    socket.broadcast.to(socket.room).emit('refreshScrore');
            }
            if (socket.numRoom != undefined) {
                    socket.join("accueil");
                    clearInterval(timerSong);
                    delete rooms[socket.numRoom];
                    socket.numRoom = undefined;
                    socket.broadcast.to(socket.room).emit('roomDelete');
                    io.sockets.to('accueil').emit('afficherLesRoomsExistante', rooms)
            }
    });

    // Fonction de vérification (INT, ARRAY)
    // test si le nouveau chiffre aléatoire est déjà présent dans le tableau
    // des musiques déjà jouées
    function Verif(a, liste)
    {
        var x = 0;
        while(x < liste.length){
            if(liste[x] == a){
                return true;
            }
            x++;
        }
    }

    function compareStr(reponseUser, laBonneReponse){
        var result = 0;
        var plusGrandChaine = 0;

        // Passage de la réponse en minuscule
        // De même pour la bonne réponse
        reponseUser = reponseUser.toLowerCase();
        laBonneReponse = laBonneReponse.toLowerCase();

        if(reponseUser.length > laBonneReponse.length)
            plusGrandChaine = reponseUser.length;
        else
            plusGrandChaine = laBonneReponse.length;

        // On récupère le nombre de caractère d'écart entre la réponse et la bonne réponse
        result = levenshteinDistance(reponseUser, laBonneReponse);

        // On mets ça sous forme de pourcentage pour avoir le degré de ressemblance
        var pourcentage = (plusGrandChaine-result)*100/plusGrandChaine;

        return pourcentage;
    }


    function levenshteinDistance(a, b){
      if(a.length == 0) return b.length; 
      if(b.length == 0) return a.length; 
     
      var matrix = [];
     
      // increment along the first column of each row
      var i;
      for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
      }
     
      // increment each column in the first row
      var j;
      for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
      }
     
      // Fill in the rest of the matrix
      for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
          if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                             matrix[i-1][j] + 1)); // deletion
          }
        }
      }
     
      return matrix[b.length][a.length];
    }

});