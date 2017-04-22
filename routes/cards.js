var express = require('express');
var router = express.Router();
const cardsController = require('../controllers/cards');

/* GET home page. */
router.get('/', cardsController.index);


module.exports = router;
