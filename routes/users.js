// Routes
'use strict'

const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

/* POST para crear un nuevo usuario */
router.post('/',userController.create);

router.post('/skills', userController.addSkill);

/*PUT actualiza los datos del usuario segun su id */
router.put('/:id', userController.update);

/*DELETE el perfil del usuario segun su id */
router.delete('/:id', userController.destroy);

/* Se declara el next() */
router.use('/', userController.index);

module.exports = router;
