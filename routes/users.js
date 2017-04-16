// Routes
'use strict'

const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

/* GET dashboard del usuario */
router.get('/', userController.index);

/* POST para crear un nuevo usuario */
router.post('/',userController.create);

/* GET el perfil del usuario segun su id */
router.get('/:id', userController.show);

/*GET los datos segun su id del usuario para editarse */
router.get('/:id/edit', userController.edit);

/*PUT actualiza los datos del usuario segun su id */
router.put('/:id', userController.update);

/*DELETE el perfil del usuario segun su id */
router.delete('/:id', userController.destroy);

/* Se declara el next() */
router.use('/', userController.index);

module.exports = router;
