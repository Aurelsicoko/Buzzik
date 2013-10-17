(function($){

 	var socket = io.connect('http://localhost:1337');
  var server = false;

  var listMusiqueUrl = "";
  var listMusiqueTitle = "";

  //Formulaire de connection
  $('#loginform').submit(function(event){
    event.preventDefault();
    if($('#username').val() == ''){
      alert('Vous devez entrer un pseudo !');
    }else{
      //Si je me connecte, j'envois mes info au server
      socket.emit('login', {username: $('#username').val()});
    }
    return false;
  });
  

  //Ecoute des sockets

  //Ecoute si il y a un buzz d'un joueur
  socket.on('newbuzz', function(user){
    //Je cache le buzzer
    console.log(user+' à buzzer');
    $('#buzzer').slideUp(100, function(){
      $(this).remove();
    })
    //Si je suis le server, je met en pause la musique
    if(server){
      document.getElementById('player').pause();
    }
  });

  //Ecoute si je buzz
  socket.on('ibuzz', function(){
    //Je cache le buzzer
    console.log('je buzz');
    $('#buzzer').slideUp(100, function(){
      $(this).remove();
    })
    //Le remplace pas un btn retour
    $('#action').append('<form id="titleform">    <input type="text" id="title" name="title">    <input type="submit" value="Valider">  </form>');

    //Insert de la prochaine action RETOUR
     $('#titleform').submit(function(event){
        event.preventDefault();
        if($('#title').val() == ''){
          alert('Vous devez entrer un titre !');
        }else{
          //Si je me connecte, j'envois mes info au server
          socket.emit('newreponse', {title: $('#title').val()});
        }
        return false;
      });
  });

  //Ecoute de si il y a une Init
  socket.on('initbuzz', function(){
    $('#retour').slideUp(100, function(){
      $(this).remove();
    });
    $('#titleform').slideUp(100, function(){
      $(this).remove();
    });
    $('#action').append('<div id="buzzer"></div>');
    //Insert de la prochaine action qui sera de buzzer
    $('#buzzer').click(function(event){
      event.preventDefault();
      socket.emit('buzz');
      return false;
    });
    //Si je suis le server je met play la musique
    if(server){
      document.getElementById('player').play();
    }
  });

  //Ecoute si je suis un utilisateur qui ven de se connecter
  socket.on('loggedUsr', function(){
    console.log('Vous etes bien connecté');
    $('#login').fadeOut();
    //J'affiche le buzzer
    $('#body').append('<div id="action"><div id="buzzer"></div></div>');
    //Insert de la prochaine action de buzzer
    $('#buzzer').click(function(event){
      event.preventDefault();
      socket.emit('buzz');
      return false;
    });
  });

  //Ecoute si je suis le sever qui viens de se connecter
  socket.on('loggedServ', function(){
    console.log('Vous etes bien connecté serv');
    server  = true;
    $('#login').fadeOut();

    function GetPlayList(a, b){
      playListUrl = a.split(',');
      playListTitle = b.split(',');
      $('#body').append('<audio id="player" src=""></audio>');
      document.getElementById('player').volume=0.1;
      $('#body').append('<button onclick="document.getElementById(\'player\').play()">Play</button>');
      $('#body').append('<button onclick="document.getElementById(\'player\').volume-=0.1">Volume -</button>');
      $('#body').append('<button onclick="document.getElementById(\'player\').volume+=0.1">Volume +</button>');

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

    //Conf de l'api deezer
    DZ.init({
      appId : '125515',
      channelUrl : 'http://web-infocom.fr/hetic/htmlcss',
      player : {
        onload : function(){}
      }
    });

    //JE charge ma playlist
    DZ.api('playlist/589406715', function(response){
      console.log(response.tracks.data);
      //Je récupére l'objet contenant la liste objet de chaque musique
      GetUrlObjet(response.tracks.data);
      //Je transforme mes bojets en deux tableau urlMP3 et Titre
      GetPlayList(listMusiqueUrl, listMusiqueTitle)
      socket.emit('initInfoTrack', {url: playListUrl, title: playListTitle});
    });
  });

  socket.on('newusr', function(user){
    $('#listConnecte').append('<span id="' + user.id + '">'+ user.id +'<br></span>');
  });

  socket.on('initNextTrack', function(numTrack){
    console.log(listMusiqueUrl[numTrack]);
    document.getElementById('player').src = numTrack;
  });

  socket.on('nextTrack', function(numTrack){
    if(server){
    document.getElementById('player').src = numTrack;
    document.getElementById('player').play();
    }
  });

  //J'ecoute si un player quitte la parti
  socket.on('signout', function(user){
    //Je l'enléve à l'affichage
    $('#'+user.username).slideUp(100, function(){
      $(this).remove();
    })
  })

 })(jQuery); 