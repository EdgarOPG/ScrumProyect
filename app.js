// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const log4js = require('log4js');


const configDB = require('./config/database.js');

const index = require('./app/routes/index');
const users = require('./app/routes/users');
const projects = require('./app/routes/projects');
const userStories = require('./app/routes/userStories');

const api = require('./app/routes/api');

// configuration ===============================================================
mongoose.connect(configDB.uri || configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(methodOverride('_method'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
app.use('/', index);
app.use('/users', users);
app.use('/projects', projects);
app.use('/userStories', userStories);


app.use('/api', api);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
