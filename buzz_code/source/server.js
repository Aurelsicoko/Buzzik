var http = require('http');
var md5 = require('md5');

httpServer = http.createServer(function(req, res){
	res.end();
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

var users = {};
io.sockets.on('connection', function(socket){
	var me = false;

	for(var k in users){
		socket.emit('newusr', users[k]);
	}

	socket.on('login', function(user){
		me = user;
		me.id = me.username;
		socket.emit('logged');
		users[me.id] = me;
		io.sockets.emit('newusr', me);
	});

	socket.on('buzz', function(){
		socket.broadcast.emit('newbuzz', me.username);
		socket.emit('ibuzz');
	});

	socket.on('bbuzz', function(){
		io.sockets.emit('initbuzz');

	});

	socket.on('disconnect', function(){
		if(!me){
			return false;
		}
		delete users[me.id];
		io.sockets.emit('signout', me);
	});
});