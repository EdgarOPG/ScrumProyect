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
  User.find({},(err, users) => {
    res.render('dashboard', { });
  });
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
  logger.debug("CREATE USER")
}

function show(req, res, next){

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
