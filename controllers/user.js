// Controller

'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();
var skills = [];

function getAll(req, res, next){
  if(req.session.user){
    //TODO refact
    User.find((err, users) => {
      res.json(users);
    });
  }
}

function getOne(req, res, next){
  if(req.session.user){
    //TODO refact
    User.findById(req.params.id,(err, user) => {
      res.json(user);
    });
  }
}

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
  let password = '';

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
      }else{
        password = hash;
        User.findByIdAndUpdate({_id:req.params.id }, {$set: {nombre: req.body.nombre,
                                                             primerApellido: req.body.primerApellido,
                                                             segundoApellido: req.body.segundoApellido,
                                                             fechaNacimiento: req.body.fechaNacimiento,
                                                             curp: req.body.curp,
                                                             rfc: req.body.rfc,
                                                             domicilio: req.body.domicilio,
                                                             skills: skills,
                                                             email: req.body.email,
                                                             password: password
                                                             }}, {upsert: true, overwrite: true}, (err, user) => {
          next();
          if(err){
            logger.error(err);
          }
          next();
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
  getAll,
  getOne,
  newUser,
  create,
  update,
  destroy,
  addSkill,
  index
};
