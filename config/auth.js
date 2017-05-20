// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '2274321466126862', // your App ID
        'clientSecret'    : '22ae3d4cd3110f7aed94db30cbcfc472', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'xKzQQ3YpY8foCNL4l2iwVkdhk',
        'consumerSecret'     : 'AAcHPimAA47FWinjQLWBczD7A51bH5glp5LJfIuW2fbwhOUgER',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
