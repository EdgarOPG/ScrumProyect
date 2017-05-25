  //Routes
'use strict'

const userStoryController = require('../controllers/userStory');
const express = require('express');
const router = express.Router();

router.get('/', userStoryController.index);

router.get('/:backlog/new', userStoryController.newUserStory);

router.post('/:backlog', userStoryController.create);

router.get('/:id/edit', userStoryController.edit);

router.put('/:id', userStoryController.update);

router.delete('/:id', userStoryController.destroy);

router.use('/', userStoryController.redirect);

module.exports = router;
