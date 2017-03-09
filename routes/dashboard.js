var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', {});
});

router.get('/navbar', function(req, res, next) {
  res.render('navbar', {});
});

router.get('/2', function(req, res, next) {
  res.render('dashboard2', {});
});

module.exports = router;
