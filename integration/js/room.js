var room = {

  // Définition des variables et callback de l'obj room
  defaults : {
    player : '',
    buzzer : '',
    affichage : '',
    form : '',
    titre : '',
    listMusiqueUrl: '',
    listMusiqueTitle : '',
    listeMusique : '',

    emitBuzzed : function () {},
    onBuzzed : function () {},
    issetAnswer : function () {},
    emptyAnswer : function () {},
    appendBuzzer : function () {},
    played : function () {},
    roomAdded : function () {},
    musiqueLoaded : function () {},
    roomListed : function () {},
    playerListed : function () {},
    musiqueListed: function () {}
  },

  // Merge des infos rempli côté utilisateur et obj
  init : function (options) {
    this.params = $.extend(this.defaults, options);
  },

  // Liste des rooms (ARRAY)
  // mise en mémoire des rooms
  // active le callback pour lister les rooms
  listeRoom : function (rooms) {
    this.rooms = rooms;
    this.params.roomListed.call(this);
  },

  // Connection à une room (INT)
  // appelle la fonction pour se connecter à la room
  rejoindreRoom : function (room){
    connect(room);
  },

  // L'utilisateur à bien rejoin une room
  // active le callback pour kill l'accueil
  roomAjoute : function (data) {
    this.params.roomAdded.call(this);
    // Envoi le mail
    var idRoom = data.idRoom;
    var listeEmails = data.listeEmails;


    $.ajax({
      type: "POST",
      url: "sentEmail.php",
      data: { id : idRoom, listeEmails: listeEmails},
      success : function(data){
        alert(data);
      }
    })
  },

  // L'utilisateur à rejoin une room 
  // test si l'élément player existe
  // si 'non'
    // active le callback d'affichage du buzzer
  roomRejoint : function () {
    var element = document.querySelector(room.params.player);
    if (typeof element == 'undefined' || element == null) {
      this.params.appendBuzzer.call(this);
    }
  },

  // Affichage des joueurs
  // active le callback d'affichage des joueurs
  afficherJoueur : function () {
    this.params.playerListed.call(this);
  },

  // Affichage des musiques jouées
  // active le callback d'affichage des musiques jouées
  afficherMusique : function () {
    this.params.musiqueListed.call(this);
  },

  // Envoie du buzz
  // envoie au server le fait que l'utilisateur à buzzé
  emitBuzz : function () {
    socket.emit('buzz');
  },

  // Le buzz à été validé côté server
  // active le callback qui affiche le formulaire de réponse
  valideBuzz : function () {
    this.params.emitBuzzed.call(this);
  },

  // Un utilisateur à buzzé dans la room
  // active le callback mettant en pse le player
  onBuzz : function () {
    this.params.onBuzzed.call(this);
  },

  // Reception de la réponse
  // test si elle est vide
  // si 'oui'
    // active le callback pour annoncer que la réponse est vide
  // si 'non'
    // active le callback pour afficher le buzzer
  envoiReponse : function (titre) {
     if(titre == ''){
        this.params.emptyAnswer.call(this);
      }else{
        this.params.issetAnswer.call(this);
      }
  },

  // Affiche le buzer
  // test si l'élément player existe
  // si 'non'
    // active le callback d'affichage du buzer
    // active le callback l'affichage des joueurs et scores
  // si 'non'
    // active le callback pour mettre play la musiqe
    // active le callback pour afficher les joueurs et scores
  afficherBuzzer : function () {
    var element = document.querySelector(room.params.player);
    if (typeof element == 'undefined' || element == null) {
      this.params.appendBuzzer.call(this);
      this.params.playerListed.call(this);
    }else{
      this.params.played(this);
      this.params.playerListed.call(this);
    }
  },

  // Mettre en place la prochaine musique (INT, STRING)
  // mise en memoir des infos
  // test si m'élément player existe
  // si 'oui'
    // active le callback pour changer la musique
  // si 'non'
    // active le callback pour afficher le buzzer
  prochaineMusique : function (numTrack, etat) {
    this.etat = etat;
    this.numTrack = numTrack;
    var element = document.querySelector(this.params.player);
    if (typeof element != 'undefined' && element != null) {
      this.params.musiqueLoaded.call(this);
    }else{
     this.params.appendBuzzer.call(this);
    }
  },

  // Création d'une room
  creerRoom : function (listeEmails) {
    $("#all").fadeOut().hide();

    listeEmails = listeEmails.split(",");

    /***************************************/

    // Envoie au server des info de la partie pour qu'il crée la room
    socket.emit('ajouterRoom', room.params.nomPartie, room.params.nbrJoueur, room.params.nbrChanson, listeEmails);

    /***************************************/

    // Création de la playlist et envoie au server des infos
    function GetPlayList(a, b, c, d){
      var playListUrl = a.split(',');
      var playListTitle = b.split(',');
      var playListArt = c.split(',');
      var playListCov = d.split(',');
      $('#all').load("template/jeu.html", function(){
        
        setTimeout(function(){

          $.event.trigger({
            type: "chargementJeu",
            message: "",
            time: new Date()
          });

          $("#all").fadeIn().show();
          $('link[rel=stylesheet]:last-of-type').attr("href", "css/jeu.css");
          socket.emit('playerPret', {url: playListUrl, title: playListTitle, artist: playListArt, cover: playListCov});

        }, 500)        
      });
    }

    // Récupération des infos utile de chaque musique de la playlist deezer
    function GetUrlObjet(o) {
        for (i in o) {
            if (typeof(o[i])=="object") {
              room.params.listMusiqueUrl = room.params.listMusiqueUrl + "," + o[i].preview;
              room.params.listMusiqueTitle = room.params.listMusiqueTitle + "," + o[i].title;
              room.params.listMusiqueArtist = room.params.listMusiqueArtist + "," + o[i].artist.name;
              room.params.listMusiqueCover = room.params.listMusiqueCover + "," + o[i].album.cover;
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
      //Je récupére l'objet contenant la liste objet de chaque musique
      GetUrlObjet(response.tracks.data);
      //Je transforme mes bojets en deux tableau urlMP3 et Titre
      GetPlayList(room.params.listMusiqueUrl, room.params.listMusiqueTitle, room.params.listMusiqueArtist, room.params.listMusiqueCover)
    });
  }

}
  
// Connection à une room via avec FBconnect
function connect(room){

      FB.init({
        appId      : '205528932959370', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });

      // Get url parameters
      var parameters = window.location.pathname.split("-");
      var idRoom = room;
      //var email = parameters[2].replace(".html", "");
      /*$.ajax({
        type: "POST",
        url: "../verifierParty.php",
        data: { idRoom: idRoom, email: email}
      }).done(function( data ) {
        if(data == 1){*/
          // Continue, all is good
            FB.getLoginStatus(function(response)
            {
              if(response.status === 'connected'){
              // connected
              FB.api('/me', function(userInfo) {
                  console.log(userInfo);
                  // Get all user informations
                  var emailUser = userInfo.email;
                  var prenomUser = userInfo.first_name;
                  var nomUser = userInfo.last_name;
                  var avatarUser = "http://graph.facebook.com/"+userInfo.username+"/picture";
                  
                  var paysUser = "";

                  var ageUser = userInfo.birthday;

                  // If the user isn't subscribed, we subscribe him else we connect him
                  $.post("connect.php", { idRoom: idRoom, emailUser: emailUser, prenomUser: prenomUser, nomUser: nomUser, avatarUser: avatarUser, paysUser: paysUser, ageUser: ageUser }, function(data){
                      data = eval('(' + data + ')');
                      if(data.response == "ok" || data.response == "subscribe"){
                        // Continue, we can show the buzzer
                        /*data.buzzer = eval('(' + data.buzzer + ')');
                        var nomBuzzer = data.buzzer.nomBuzzer;
                        var sonnerieBuzzer = data.buzzer.sonnerieBuzzer;*/

                        var nom = prenomUser+' '+nomUser;

                        socket.emit('rejoindreRoom', room, nom);
                      }
                      else{
                        // There was a problem, stop the script
                        return;
                      }
                   });
                });
              }else if(response.status === 'not_authorized'){
              // not_authorized
              login();
              }else{
              // not_logged_in
              login();
              
              }
            });

          function login(_self) {
            var urlRedirect = document.URL;
            window.location = "https://m.facebook.com/dialog/oauth?client_id=205528932959370&response_type=code&redirect_uri=" + urlRedirect + "&scope=email,user_birthday";
              /*FB.login(function(response) {
                alert(response);
                if (response.authResponse) {
                  console.log(response);

                      // connected
                    FB.api('/me', function(userInfo) {
                      console.log(userInfo);
                      // Get all user informations
                      var emailUser = userInfo.email;
                      var prenomUser = userInfo.first_name;
                      var nomUser = userInfo.last_name;
                      var avatarUser = "http://graph.facebook.com/"+userInfo.username+"/picture";
                      var paysUser = userInfo.location.name.split(",")[1];
                      var ageUser = userInfo.birthday;

                      // If the user isn't subscribed, we subscribe him else we connect him
                      $.post("connect.php", { idRoom: idRoom, emailUser: emailUser, prenomUser: prenomUser, nomUser: nomUser, avatarUser: avatarUser, paysUser: paysUser, ageUser: ageUser }, function(data){
                        data = eval('(' + data + ')');
                        if(data.response == "ok" || data.response == "subscribe"){
                          // Continue, we can show the buzzer
                          /*data.buzzer = eval('(' + data.buzzer + ')');
                          var nomBuzzer = data.buzzer.nomBuzzer;
                          var sonnerieBuzzer = data.buzzer.sonnerieBuzzer;*/
                          /*var nom = prenomUser+' '+nomUser;

                          socket.emit('rejoindreRoom', room, nom);
                        }
                        else{
                          // There was a problem, stop the script
                          return;
                        }
                       });
                  });
                } else {
                      // cancelled
                  }
              },{scope: 'email,user_birthday'}); */
          }

        /*}
        else{
          // Oups, there are a little problem this email isn't associated to this party
          document.location.href= "./" 
        }
      });*/
  console.log("FB Connect");
}  