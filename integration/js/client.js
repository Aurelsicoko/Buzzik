var socket = io.connect('http://buzzik.local:1337/');
var audio = new Audio("sound/banzai.mp3");

socket.on('connect', function () {


  // Initialisation de la partie ux du jeux
  room.init({
    // Initialisation des id de chaque bouton du jeux
    player : '#player',
    buzzer : '#buzzer',
    affichage : '#rooms',
    form : '#titleform',
    titre : '#title',
    listeAllJoueur: '#listeAllJoueur',
    listeJoueur : '#listeJoueur',
    listeMusique : '#listeMusique',
    monScore : 'monScore',

    // Liste les rooms
    // vide la div conteneur
    // liste les rooms si elle ne sont pas null
    roomListed : function () {
      $(room.params.affichage).empty();
      for (i in room.rooms) {
        if (room.rooms[i] != null) {
          $(room.params.affichage).append('<div><a href="./?room='+room.rooms[i].id+'">' + room.rooms[i].nom + '</a></div>');
        }
      }
    },

    // Liste les joueurs de la partie
    // et met a jour les scores
    // intialise des variables
    // récupére l'élément listeAllJoueur
    // test si il existe
    // si 'oui'
      // vider l'élément
      // liste chaque joueur si il fait bien partie de la room
      // si tout les joueurs ne son aps connecter alors afficher un utilisateur non connecté
    //si 'non'
      // récupéré l'élément listeJoueur
      // test si il existe
      //si 'oui'
        // vider l'élément 
        // afficher tout les joueurs de la room sauf l'utilisateur
        // afficher le score de l'utilisateur dans l'élément monScore
    playerListed : function () {
      var html = "", tour = 0;
      var element = $(room.params.listeAllJoueur);
      if (typeof element != 'undefined' && element != null) {
        $(room.params.listeAllJoueur).empty();
        for (i in room.usernames) {
          if (room.usernames[i] != null) {
            if (room.usernames[i].room == room.room) {
              html += '<li class="online"><img class="borderWhite" src="images/avatar_example.png" alt="'+room.usernames[i].id+'" /><h3>'+room.usernames[i].user+'</h3><p>'+room.usernames[i].point+'</p></li>';
              tour++;
            }  
          }
        }

        var diff = 4-tour;
        for(var i=0; i<diff; i++){
          html += '<li class="online"><img class="borderWhite" src="images/avatar_example.png" /><h3>Offline</h3><p>0</p></li>';
        }

        $(room.params.listeAllJoueur).html(html);

      }

      element = $(room.params.listeJoueur);
      if (typeof element != 'undefined' && element != null) {
        $(room.params.listeJoueur).empty();
        for (j in room.usernames) {
          if (room.usernames[j] != null) {
            if (room.usernames[j].room == room.room && j != room.monId) {
              $(room.params.listeJoueur).append('Nom : '+room.usernames[j].user+' Point : '+room.usernames[j].point+'<br>');
            }
            if (j == room.monId) {
              var points = room.usernames[j].point;
              var idScore = '#'+room.params.monScore;
              //$(idScore).hide().html(room.usernames[j].point).fadeIn();
              setTimeout(function(){
                 $(idScore).hide().html(points).fadeIn();
              }, 1000);
            }
          }
        }
      }
    },

    // Afficher les musiques jouées
    // vide l'element 
    // liste les musiques
    // puis les affiche
    musiqueListed : function () {
      var html = "";
      $(room.params.listeMusique).empty();
      for (m = room.listeMusique.length-1 ; m >= 0 ; m--) {
        html += '<li><img src="'+room.listeMusique[m].cover+'" /><p><strong>'+room.listeMusique[m].artist+'</strong><br>'+room.listeMusique[m].title+'</p></li>';
      }
      $(room.params.listeMusique).html(html);

    },

    // Affichage du formulaire de réponse
    // affiche le formulaire
    // focus du champ de réponse
    // écoute de l'envoie de la réponse
    emitBuzzed : function () {
      $('#all').load("template/formulaire.html", function () {
        setTimeout(function(){
           $(room.params.titre).focus();
        },500);
        $(room.params.form).submit(function (e) {
          e.preventDefault();
          room.envoiReponse($(room.params.titre).val());
          return false;
        });
      });
    },

    // Pause du player lors d'un buzz
    // test l'existence du player
    // si 'oui'
      // mettre en pause la musique
    onBuzzed : function (data) {
      //$('#'+room.params.buzzer).remove();
      var element = document.querySelector(room.params.player);
      if (typeof element != 'undefined' && element != null) {
        $("img[alt="+data+"]").removeClass("borderWhite").addClass("borderRed");
        player.pause();
      }
    },

    // Réponse vide
    emptyAnswer : function () {
      alert('Vous devez entrer un titre !');
    },

    // Envoie de la réponse
    issetAnswer : function () {
      socket.emit('reponse', $(room.params.titre).val());
    },

    // Afficher le buzzer
    appendBuzzer : function () {
      $('#all').load("template/buzzer.html");
      $('link[rel=stylesheet]:last-of-type').attr("href", "css/mobile.css");
      socket.emit('refreshScrore');
    },

    // Mettre play le player
    played : function () {
      player.play();
    },

    // Utilisateur bien connecter à la room
    // suppresion de l'élement accueil
    roomAdded : function () {
      $('#accueil').remove();
    },

    // Musique bien chargé
    musiqueLoaded : function () {
      player.setFile(room.numTrack);
      if(room.etat == "play") {
        player.play();
      }

      setTimeout(function(){
        $("path").remove();
      }, 500);  
    }
  }); 

  // Detection d'url pour rejoindre une room
  // test existe ?room=:id
  // si 'oui'
    // rejoindre cette room
  // si 'non'
    // afficher l'accueil
  if (typeof window.location.search != '' && window.location.search != ''){
    var getRoom = window.location.search.split('=');
    getRoom[1] = parseInt(getRoom[1]);

    if(!isNaN(getRoom[1]) && getRoom[1]!=''){
      room.rejoindreRoom(getRoom[1]);
    }
  }else{
    formulaire.afficherFomulaire();
  }


});


// Afficher un message
// alert du message reçus
socket.on('message', function (message) {
  alert(message);
});

// Afficher les rooms existantes
// active la fonction de l'obj room qui liste les rooms
socket.on('afficherLesRoomsExistante', function (rooms) {
  room.listeRoom(rooms);
});

// L'ulisateur a créer une room
// active la fonction de l'obj room qui prépare l'affichage de l'espace de jeux
socket.on('roomAjoute', function (data) {
  room.roomAjoute(data);
});

// L'ulisateur a rejoin une room
// active la fonction de l'obj room qui prépare l'affichage du buzzer
socket.on('roomRejoin', function () {
  room.roomRejoint();
});

// Affichage des joueur de la partie (ARRAY, INT, INT)
// mise en memoir des infos joueurs
// active la fonction de l'obj room qui affiche les joueurs
socket.on('afficherJoueur', function (usernames, rooms, monId) {
  room.usernames = usernames;
  room.room = rooms;
  room.monId = monId;
  room.afficherJoueur();
})
// Changement de musique du player (INT, STRING)
// active la fonction de l'obj room qui change la musique du player
socket.on('prochaineMusique', function(numTrack, etat){
  room.prochaineMusique(numTrack, etat);
});

// Reception d'un buz dans la room
// active la fonction de l'objet room qui met en pause le player
socket.on('buzz', function (data) {
  room.onBuzz(data);
  if(audio != null){
    audio.play();
    audio = null;
  }
  
});

// Validation du buzz
// active la fonction de l'obj room qui affiche le formulaire de réponse
socket.on('valideBuzz', function () {
  room.valideBuzz();
});

// Affiche le buzzer
// active la fonction de l'obj room qui affiche le buzzer
socket.on('afficheBuzzer', function () {
  room.afficherBuzzer();
});

// Refresh des score
// demande au server d'envoyer à l'utilisateur les infos joueurs de la room
socket.on('refreshScrore', function () {
  socket.emit('refreshScrore');
});

// Refresh de la liste des musique jouées (ARRAY)
// mise en memoir de la liste
// active la fonction de l'obj room qui affiche la liste des muqieu jouées
socket.on('refreshListesInfos', function (liste) {
  room.listeMusique = liste;
  room.afficherMusique();
});

// Detection de fin ou suppression de partie
// redirige vers la page d'accueil
socket.on('roomDelete', function () {
  document.location.href="index.php"; 
});

// Detection du buzzer
$('#all').on('click','#buzzer', function(e){
  e.preventDefault();
  room.emitBuzz();
});



