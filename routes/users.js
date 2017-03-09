var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/blank', {});
});

router.get('/blank', (req, res, next) => {
  res.render('users/blank', {});
});

module.exports = router;
