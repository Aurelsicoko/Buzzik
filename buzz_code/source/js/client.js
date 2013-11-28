 (function($){

 	var socket = io.connect('http://localhost:1337');

  $('#loginform').submit(function(event){
    event.preventDefault();
    if($('#username').val() == ''){
      alert('Vous devez entrer un pseudo !');
    }else{
      socket.emit('login', {username: $('#username').val()});
    }
    return false;
  });

  $('#buzzer').click(function(event){
    event.preventDefault();
    socket.emit('buzz');
    return false;
  });

  

  //Ecoute des sockets


  socket.on('newbuzz', function(user){
    console.log(user+' à buzzer');
    $('#buzzer').slideUp(100, function(){
      $(this).remove();
    })
  });

  socket.on('ibuzz', function(){
    console.log('je buzz');
    $('#buzzer').slideUp(100, function(){
      $(this).remove();
    })
    $('#action').append('<div id="retour"></div>');

    $('#retour').click(function(event){
    event.preventDefault();
    socket.emit('bbuzz');
    return false;
  });

  });

  socket.on('initbuzz', function(){
    $('#retour').slideUp(100, function(){
      $(this).remove();
    })
    $('#action').append('<div id="buzzer"></div>');

    $('#buzzer').click(function(event){
    event.preventDefault();
    socket.emit('buzz');
    return false;
  });
  });

  socket.on('logged', function(){
    console.log('Vous etes bien connecté');
    $('#login').fadeOut();
  });

  socket.on('newusr', function(user){
    $('#listConnecte').append('<span id="' + user.id + '">'+ user.id +'<br></span>');
  });

  socket.on('signout', function(user){
    $('#'+user.username).slideUp(100, function(){
      $(this).remove();
    })
  })

 })(jQuery); 