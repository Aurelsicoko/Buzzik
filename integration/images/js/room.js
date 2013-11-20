var room = {

  defaults : {
    player : '',
    buzzer : '',
    affichage : '',
    form : '',
    titre : '',
    listMusiqueUrl: '',
    listMusiqueTitle : '',

    emitBuzzed : function () {},
    onBuzzed : function () {},
    issetAnswer : function () {},
    emptyAnswer : function () {},
    appendBuzzer : function () {},
    played : function () {},
    roomAdded : function () {},
    roomJoined : function () {},
    musiqueLoaded : function () {},
    roomListed : function () {},
    playerListed : function () {}
  },

  init : function (options) {
    this.params = $.extend(this.defaults, options);
  },

  listeRoom : function (rooms) {
    this.rooms = rooms;
    this.params.roomListed.call(this);
  },

  rejoindreRoom : function (room){
    console.log("Room n°"+room);
    connect(room);
  },

  roomAjoute : function () {
    this.params.roomAdded.call(this);
  },

  roomRejoint : function () {
    var element = document.getElementById(room.params.player);
    if (typeof element == 'undefined' || element == null) {
      this.params.roomJoined.call(this);
    }
  },

  afficherJoueur : function () {
    this.params.playerListed.call(this);
  },

  emitBuzz : function () {
    socket.emit('buzz');
    console.log("emitbuzz");
  },

  valideBuzz : function () {
    console.log('exe');
    this.params.emitBuzzed.call(this);
  },

  onBuzz : function () {
    this.params.onBuzzed.call(this);
  },

  envoiReponse : function (titre) {
     if(titre == ''){
        this.params.emptyAnswer.call(this);
      }else{
        this.params.issetAnswer.call(this);
      }
  },

  afficherBuzzer : function () {
    var element = document.getElementById(room.params.player);
    if (typeof element == 'undefined' || element == null) {
      this.params.appendBuzzer.call(this);
      this.params.playerListed.call(this);
    }else{
      this.params.played(this);
      this.params.playerListed.call(this);
    }
  },

  prochaineMusique : function (numTrack, etat) {
    this.etat = etat;
    this.numTrack = numTrack;
    var element = document.getElementById(this.params.player);
    if (typeof element != 'undefined' && element != null) {
      this.params.musiqueLoaded.call(this);
    }else{
     this.params.appendBuzzer.call(this);
    }
  },

  creerRoom : function () {
    $("#reglages").remove();

    alert("Créér une room de "+room.params.nbrJoueur+" joueur(s) au nom de "+room.params.nomPartie+" sur "+room.params.nbrChanson+" chansons !");

    /***************************************/

    socket.emit('ajouterRoom', room.params.nomPartie, room.params.nbrJoueur, room.params.nbrChanson);

    /***************************************/

    function GetPlayList(a, b){
      var playListUrl = a.split(',');
      var playListTitle = b.split(',');
      $('#all').load("template/jeu.html", function(){
        $('link[rel=stylesheet]:last-of-type').attr("href", "css/jeu.css");
        socket.emit('playerPret', {url: playListUrl, title: playListTitle});
      });
    }

    function GetUrlObjet(o) {
        for (i in o) {
            if (typeof(o[i])=="object") {
              console.log(o[i].preview);
              console.log(o[i].title);
              room.params.listMusiqueUrl = room.params.listMusiqueUrl + "," + o[i].preview;
              room.params.listMusiqueTitle = room.params.listMusiqueTitle + "," + o[i].title;
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
      //Je récupére l'objet contenant la liste objet de chaque musique
      GetUrlObjet(response.tracks.data);
      //Je transforme mes bojets en deux tableau urlMP3 et Titre
      GetPlayList(room.params.listMusiqueUrl, room.params.listMusiqueTitle)
    });
  }

}
  

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
                console.log("Yeah");
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
              FB.login(function(response) {
                if (response.authResponse) {
                      // connected
                    FB.api('/me', function(userInfo) {
                      console.log("Yeah");
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
                          var nom = prenomUser+' '+nomUser;

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
              },{scope: 'email,user_birthday'});
          }

        /*}
        else{
          // Oups, there are a little problem this email isn't associated to this party
          document.location.href= "./" 
        }
      });*/
  console.log("FB Connect");
}  