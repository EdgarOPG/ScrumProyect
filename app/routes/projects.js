//Routes
'use strict'

const projectController = require('../controllers/project');
const express = require('express');
const router = express.Router();
const userStories = require('./userStories');

/* POST para agregar un array de collaborators */
router.post('/collaborators', projectController.addCollaborators);

/* Get dashboard */
router.get('/', projectController.index);

/* POST para crear un nuevo proyecto*/
router.post('/', projectController.create);

/* GET view nuevo proyecto*/
router.get('/new', projectController.newProject);

/* GET view editar proyecto*/
router.get('/:id/edit', projectController.edit);

/* PUT para editar proyecto*/
router.put('/:id', projectController.update);

/* GET el proyecto segun su id*/
router.get('/:id', projectController.show);

/* DELETE para eliminar proyecto*/
router.delete('/:id', projectController.destroy );

module.exports = router;
