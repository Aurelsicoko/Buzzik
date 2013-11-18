var socket = io.connect('http://localhost:1337');

socket.on('connect', function () {


  /*if (typeof location.search != 'undefined'){
    var getRoom = location.search.split('=');
    if(!isNaN(getRoom) && getRoom!=''){
      console.log('coucou')
      room.rejoindreRoom(getRoom);
    }
  }*/



  room.init({
    player : 'player',
    buzzer : 'buzzer',
    affichage : 'rooms',
    form : 'titleform',
    titre : 'title',
    listeAllJoueur: 'listeAllJoueur',
    listeJoueur : 'listeJoueur',
    monScore : 'monScore',

    roomListed : function () {
      $('#'+room.params.affichage).empty();
      for (i in room.rooms) {
        if (room.rooms[i] != null) {
          $('#'+room.params.affichage).append('<div><a href="#" onclick="room.rejoindreRoom(\''+room.rooms[i].id+'\')">' + room.rooms[i].nom + '</a></div>');
        }
      }
    },

    playerListed : function () {
      
      console.log(room.monId);


      var element = document.getElementById(room.params.listeAllJoueur);
      if (typeof element != 'undefined' && element != null) {
        $('#'+room.params.listeAllJoueur).empty();
        for (i in room.usernames) {
          if (room.usernames[i] != null) {
            if (room.usernames[i].room == room.room) {
              $('#'+room.params.listeAllJoueur).append('Nom : '+room.usernames[i].user+' Point : '+room.usernames[i].point+'<br>');
            }
          }
        }
      }

      element = document.getElementById(room.params.listeJoueur);
      if (typeof element != 'undefined' && element != null) {
        $('#'+room.params.listeJoueur).empty();
        for (j in room.usernames) {
          if (room.usernames[j] != null) {
            if (room.usernames[j].room == room.room && j != room.monId) {
              $('#'+room.params.listeJoueur).append('Nom : '+room.usernames[j].user+' Point : '+room.usernames[j].point+'<br>');
            }
            if (j == room.monId) {
              console.log($('#'+room.params.monScore));
              $('#'+room.params.monScore).empty();
              $('#'+room.params.monScore).append('Point : '+room.usernames[room.monId].point);
            }
          }
        }
      }
    },


    emitBuzzed : function () {
      $('#all').load("template/formulaire.html", function () {
        $('#'+room.params.titre).focus();
        $('#'+room.params.form).submit(function (e) {
          e.preventDefault();
          room.envoiReponse($('#'+room.params.titre).val());
          return false;
        });
      });
    },

    onBuzzed : function () {
      //$('#'+room.params.buzzer).remove();
      var element = document.getElementById(room.params.player);
      if (typeof element != 'undefined' && element != null) {
        document.getElementById(room.params.player).pause();
      }
    },

    emptyAnswer : function () {
      alert('Vous devez entrer un titre !');
    },

    issetAnswer : function () {
      socket.emit('reponse', $('#'+room.params.titre).val());
    },

    appendBuzzer : function () {
      $('#'+room.params.buzzer).remove();
      $('#all').load("template/buzzer.html");
      $('link[rel=stylesheet]:last-of-type').attr("href", "css/mobile.css");
      console.log('refreshScrore')
      socket.emit('refreshScrore');
    },

    played : function () {
      document.getElementById(room.params.player).play();
    },

    roomAdded : function () {
      $('#accueil').remove();
    },

    roomJoined : function () {
      $('#all').load("template/buzzer.html");
      $('link[rel=stylesheet]:last-of-type').attr("href", "css/mobile.css");
      console.log('refreshScrore')
      socket.emit('refreshScrore');
    },

    musiqueLoaded : function () {
      document.getElementById(room.params.player).src = room.numTrack;
      if (room.etat == "play") {
        document.getElementById(room.params.player).play();
        document.getElementById(room.params.player).addEventListener('ended', function() {
          socket.emit('musiqueFini');
        });
      }
    }
  }); 

  console.log(typeof location.search);
  if (typeof location.search != '' && location.search != ''){
    var getRoom = location.search.split('=');
    if(!isNaN(getRoom[1]) && getRoom[1]!=''){
      room.rejoindreRoom(getRoom[1]);
    }
  }else{
    formulaire.afficherFomulaire();
  }


});


socket.on('message', function (message) {
  alert(message);
});

socket.on('afficherLesRoomsExistante', function (rooms) {
  room.listeRoom(rooms);
});

socket.on('roomAjoute', function () {
  room.roomAjoute();
});

socket.on('roomRejoin', function () {
  room.roomRejoint();
});

socket.on('afficherJoueur', function (usernames, rooms, monId) {
  room.usernames = usernames;
  room.room = rooms;
  room.monId = monId;
  room.afficherJoueur();
})

socket.on('prochaineMusique', function(numTrack, etat){
  room.prochaineMusique(numTrack, etat)
});

socket.on('buzz', function () {
  console.log('buzz dans la room');
  room.onBuzz();
});

socket.on('valideBuzz', function (a) {
  console.log(a);
  room.valideBuzz();
});

socket.on('afficheBuzzer', function () {
  room.afficherBuzzer();
});

socket.on('refreshScrore', function () {
  console.log('refreshScrore')
  socket.emit('refreshScrore');
});

socket.on('roomDelete', function () {
  document.location.href="index.html"; 
});