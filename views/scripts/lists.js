// Creating web socket
var socket = io.connect('http://localhost:3000/');

// Socket receives the login URI
socket.on('loginURI', function(data) {
	console.log(data.message);
});