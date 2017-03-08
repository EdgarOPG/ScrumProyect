var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', {});
});

router.get('/blank', (req, res, next) => {
  res.render('users/blank', {});
});

router.post('/create', (req, res, next) => {
  console.log(req.body.usuario);
  console.log(req.body.nombre);
  console.log(req.body.primerApellido);
  console.log(req.body.segundoApellido);
});

module.exports = router;
