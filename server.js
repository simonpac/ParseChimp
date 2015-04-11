
var express = require('express');
var app = express();

require('./router/main')(app);
app.set('views',__dirname + '/views/html/');
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.engine('html', require('ejs').renderFile);

app.post('/start_clicked', function (req, res) {
    console.log('ParseChimp has started');

    start_oauth(res);

});

var server = app.listen(3000, function() {
	console.log("started server on localhost:3000")
});

function start_oauth(io) {
  
    var MailChimpOAuth = require('mailchimp').MailChimpOAuth;
    var MailChimpAPI = require('mailchimp').MailChimpAPI;

    var options = {
        clientId: '549992645718',
        clientSecret: 'da2b9ec94c7dd5ac2195e3341abba632',
        serverUri: 'http://127.0.0.1',
        redirectUri: 'http://127.0.0.1:3000/lists'
    };

    var oauth = new MailChimpOAuth(options);
	var authUri = oauth.getAuthorizeUri();
	var io = require('socket.io').listen(server);

	// Send login URI to client
	io.sockets.on('connection', function(socket) {
    	socket.emit('loginURI', { message: authUri });
	});
    

    oauth.on('error', function (error) {
        console.log(error.message);
    });

    oauth.on('authed', function (apiKey) {

        try { 
            var api = new MailChimpAPI(apiKey, { version : '1.3', secure : false });
        } catch (error) {
            console.log(error.message);
        }

        console.log(apiKey);

        api.lists({ start: 0, limit: 25 }, function (error, data) {
            if (error)
                console.log(error.message);
            else {
				var json = JSON.stringify(data);
				console.log(json);
				
				// Transmitting json to lists.js file
				io.sockets.on('connection', function(socket) {
    				socket.emit('list_json', { message: json });
				});

            }

        });
    });
}