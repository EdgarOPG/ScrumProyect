// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '2274321466126862', // your App ID
        'clientSecret'    : '22ae3d4cd3110f7aed94db30cbcfc472', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'xKzQQ3YpY8foCNL4l2iwVkdhk',
        'consumerSecret'     : 'AAcHPimAA47FWinjQLWBczD7A51bH5glp5LJfIuW2fbwhOUgER',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '51472290617-v3epql0sbqq9pol0eqevks1efhrgq0j0.apps.googleusercontent.com',
        'clientSecret'     : 'zb6mc-S2WqjHB4dYEuN1sPjg',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
