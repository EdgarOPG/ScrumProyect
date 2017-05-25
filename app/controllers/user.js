// Controller

'use strict'
const express = require('express');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

var skills = [];

function index(req, res, next){
  logger.debug("INDEX");

  res.redirect('/profile');
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
        });
      }
    });
  }
}

function destroy(req, res, next){
  logger.debug("DESTROY");
  let code = '';
  let message = '';
  User.remove({ _id: ObjectId(req.user._id) }, (err) => {
    res.redirect('/');
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
                                                             usuario: req.body.usuario,
                                                             primerApellido: req.body.primerApellido,
                                                             segundoApellido: req.body.segundoApellido,
                                                             fechaNacimiento: req.body.fechaNacimiento,
                                                             curp: req.body.curp,
                                                             rfc: req.body.rfc,
                                                             domicilio: req.body.domicilio,
                                                             skills: skills,
                                                             local: {
                                                               email: req.body.email,
                                                               password: password},
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
  update,
  destroy,
  addSkill,
  index
};
