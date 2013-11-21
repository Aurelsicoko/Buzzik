var socket = io.connect('http://localhost:1337');

socket.on('connect', function () {

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

      var html = "", tour = 0;
      var element = document.getElementById(room.params.listeAllJoueur);
      if (typeof element != 'undefined' && element != null) {
        $('#'+room.params.listeAllJoueur).empty();
        for (i in room.usernames) {
          if (room.usernames[i] != null) {
            if (room.usernames[i].room == room.room) {
              html += '<li class="online"><img src="images/avatar_example.png" /><h3>'+room.usernames[i].user+'</h3><p>'+room.usernames[i].point+'</p></li>';
              tour++;
            }  
          }
        }

        var diff = 4-tour;
        console.log(diff);
        for(var i=0; i<diff; i++){
          html += '<li class="online"><img src="images/avatar_example.png" /><h3>Non connecté</h3><p>0</p></li>';
        }

        $('#'+room.params.listeAllJoueur).html(html);

      }
      console.log(room.params.listeJoueur);
      element = $("#"+room.params.listeJoueur);
      console.log(element);
      if (typeof element != 'undefined' && element != null) {
        $('#'+room.params.listeJoueur).empty();
        for (j in room.usernames) {
          if (room.usernames[j] != null) {
            if (room.usernames[j].room == room.room && j != room.monId) {
              $('#'+room.params.listeJoueur).append('Nom : '+room.usernames[j].user+' Point : '+room.usernames[j].point+'<br>');
            }
            if (j == room.monId) {
              var idScore = "#"+room.params.monScore;
              setTimeout(function(){
                 $(idScore).hide().html(room.usernames[j].point).fadeIn();
              }, 1000)
            }
          }
        }
      }
    },


    emitBuzzed : function () {
      $('#all').load("template/formulaire.html", function () {
        setTimeout(function(){
           $('#'+room.params.titre).focus();
        },500);
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
        player.pause();
      }
    },

    emptyAnswer : function () {
      alert('Vous devez entrer un titre !');
    },

    issetAnswer : function () {
      socket.emit('reponse', $('#'+room.params.titre).val());
    },

    appendBuzzer : function () {
      $('#all').load("template/buzzer.html");
      $('link[rel=stylesheet]:last-of-type').attr("href", "css/mobile.css");
      console.log('refreshScrore')
      socket.emit('refreshScrore');
    },

    played : function () {
      player.play();
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
      $("path").fadeOut(500, function(){ $(this).remove(); });
      player.setFile(room.numTrack);
      if(room.etat == "play") {
        player.play();
      }
    }
  }); 

  console.log(typeof location.search);
  if (typeof window.location.search != '' && window.location.search != ''){
    var getRoom = window.location.search.split('=');
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
  document.location.href="index.php"; 
});