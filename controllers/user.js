// Controller

'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();
var skills = [];

function index(req, res, next){
  logger.debug("INDEX");
  logger.debug(skills);

  res.redirect('/dashboard');
  //console.log(req.session.user);


  /*User.find({},(err, users) => {
    res.render('dashboard', {'users':users, 'user':user,
     'status': res.locals.status});
  });*/
}

/* GET signup view en blanco para crear usuario*/
function newUser(req, res, next){
  logger.debug("NEW USER");

  const user = {
    'usuario':'',
    'nombre':'',
    'primerApellido':'',
    'segundoApellido':'',
    'fechaNacimiento':'',
    'curp':'',
    'rfc':'',
    'domicilio':'',
    'email':'',
    'password':'',
  }

  res.render('users/new', {'user':user});
}

function create(req, res, next){
  logger.debug("CREATE USER");
  logger.debug(req.body.skills);

  let user = new User({
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    fechaNacimiento: req.body.fechaNacimiento,
    curp: req.body.curp,
    rfc: req.body.rfc,
    domicilio: req.body.domicilio,
    email: req.body.email,
    password: req.body.password
  });

  if(req.body.password){
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
      let code = '';
      let message = '';

      if(err){
        code = 'danger';
        message = 'No se ha podido guardar el usuario';
        res.locals.status = {
          code:code,
          message:message
        };
        next();
        //res.redirect('/dashboard/');
      }else{
        user.password = hash;
        user.save((err, object) => {
          if(err){
            code = 'danger';
            message = 'No se ha podido guardar el usuario.';
          }else{
            code = 'success';
            message = 'Usuario creado Correctamente.';
          }
          res.locals.status = {
            code:code,
            message:message
          };
          next();
          //res.redirect('/dashboard/');
        });
      }
    });
  }
}

function destroy(req, res, next){
  logger.debug("DESTROY");
  let code = '';
  let message = '';
  User.remove({ _id: req.session.id }, (err) => {
    if (!err) {
      res.locals.status = {
        code:'error',
        message:'El usuario no fue eliminado.'
      };
    }
    else {
      res.locals.status = {
        code:'success',
        message:'Usuario eliminado Correctamente.'
      };
    }
});
}


function update(req, res, next){
  logger.debug("UPDATE");
  let code = '';
  let message = '';
  let user = {
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    fechaNacimiento: req.body.fechaNacimiento,
    curp: req.body.curp,
    rfc: req.body.rfc,
    domicilio: req.body.domicilio,
    email: req.body.email,
    password: req.body.password
  };

  logger.debug(user);


  if(req.body.password){
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
      let code = '';
      let message = '';

      if(err){
        code = 'danger';
        message = 'No se ha podido guardar el usuario';
        res.locals.status = {
          code:code,
          message:message
        };
        next();
        //res.redirect('/dashboard/');
      }else{
        user.password = hash;
        User.findByIdAndUpdate({_id:req.params.id }, {$set: {skills: skills}}, {upsert: true, overwrite: true}, (err) => {
          next();
          if(err){
            logger.error(err);
            code = 'danger';
            message = 'No se ha podido guardar el usuario.';
          }else{
            code = 'success';
            message = 'Usuario creado Correctamente.';
          }
          res.locals.status = {
            code:code,
            message:message
          };
          next();
          //res.redirect('/dashboard/');
        });
      }
    });
  }
}

function addSkill(req, res, next){
  skills = req.body.skills;
  logger.debug(skills);
}

module.exports = {
  index,
  newUser,
  create,
  update,
  destroy,
  addSkill
};
