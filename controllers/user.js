// Controller

'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

function index(req, res, next){
  logger.debug("INDEX");

  let user = "";
  if(req.session.user){
    user = req.session.user;
  }

  res.render('profile', {'user':user,
   'status': res.locals.status});

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

function show(req, res, next){
  logger.debug("SHOW");
  User.findOne({_id:req.session.user},(err, user)=>{
    res.render('/profile/', {'user':user});
  });
}

function edit(req, res, next){

}

function destroy(req, res, next){

}

function update(req, res, next){

}
module.exports = {
  index,
  newUser,
  create,
  show,
  edit,
  update,
  destroy
};
