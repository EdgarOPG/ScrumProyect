// Routes
'use strict'

var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index');
const userController = require('../controllers/user');

/* Redirect to login page.  */
router.get('/', indexController.redirect);

/* GET login page.  */
router.get('/login', indexController.index);

/* POST para hacer login */
router.post('/login', indexController.login);

/* GET view signup para crear usuario */
router.get('/signup', userController.newUser);

/* GET dashboard del usuario */
router.get('/dashboard', indexController.dashboard);

/* GET el perfil del usuario segun su id */
router.get('/:id', indexController.show);

/* GET los datos segun su id del usuario para editarse */
router.get('/:id/edit', indexController.edit);

module.exports = router;
