const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session')

const Skills = require('./models/skill');
const Users = require('./models/user');


//Definicion de las routes
const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const profile = require('./routes/profile');
const land = require('./routes/land');
const graf = require('./routes/graf');
const cards = require('./routes/cards');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'abcd12345',
  resave: false,
  saveUnitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Definicion de middlewares de los routes
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/profile', profile);
app.use('/land', land);
app.use('/graf', graf);
app.use('/dashboard/cards', cards);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
