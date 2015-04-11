
function start_oauth() {
    

    var MailChimpOAuth = require('mailchimp').MailChimpOAuth;
    var MailChimpAPI = require('mailchimp').MailChimpAPI;

    var options = {
        clientId: '549992645718',
        clientSecret: 'da2b9ec94c7dd5ac2195e3341abba632',
        serverUri: 'http://127.0.0.1',
        redirectUri: 'http://www.example.com/successfulLogin.html'
    };

    var oauth = new MailChimpOAuth(options);

    console.log(oauth.getAuthorizeUri()); // The MailChimp login URI the user needs to be sent to

    oauth.on('error', function (error) {
        console.log(error.message);
    });

    oauth.on('authed', function (apiKey) {

        try { 
            var api = new MailChimpAPI(apiKey, { version : '1.3', secure : false });
        } catch (error) {
            console.log(error.message);
        }

        api.campaigns({ start: 0, limit: 25 }, function (error, data) {
            if (error)
                console.log(error.message);
            else
                console.log(JSON.stringify(data)); // Do something with your data!
        });

    });
}

