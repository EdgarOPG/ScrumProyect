// Routes
'use strict'

const express = require('express');
const apiController = require('../controllers/api');
const router = express.Router();

/* GET para obtener a todos los usuarios */
router.get('/users',apiController.getAllUsers);

/* GET para obtener un usuario segun su id */
router.get('/users/me',apiController.getMe);

/* GET para obtener un usuario segun su id */
router.get('/users/:id',apiController.getUserById);

/* GET para obtener un usuario segun su id */
router.get('/projects/current',apiController.getCurrentProject);

router.get('/userStories/current',apiController.getCurrentUsersStories);

module.exports = router;
