'use strict'

const express = require('express');
const cardController = require('../controllers/card');
const router = express.Router();

/* GET home page. */
router.get('/', cardController.index);

router.get('/', cardController.newCard);

router.post('/',cardController.create);

/*router.get('/:id', cardController.show );

router.get('/:id/edit', cardController.edit);

router.put('/:id', cardController.update );

router.delete('/:id', cardController.destroy );
*/
router.use('/', cardController.index);





module.exports = router;
