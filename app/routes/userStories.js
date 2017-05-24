//Routes
'use strict'

const userStoryController = require('../controllers/userStory');
const express = require('express');
const router = express.Router();

router.get('/', userStoryController.index);

router.get('/new', userStoryController.newCard);

router.post('/', userStoryController.create);

router.get('/:id/edit', userStoryController.edit);

router.put('/:id', userStoryController.update );

router.delete('/:id', userStoryController.destroy );

module.exports = router;
