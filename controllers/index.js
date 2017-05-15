//Controller
'use strict'

const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

function redirect(req, res, nest){
  res.redirect('/login');
}

function index(req, res, next) {
  res.render('index', {  });
}

function login(req, res, next){
  logger.info(req.body.usuario);
  logger.info(req.body.password);

  User.findOne({usuario:req.body.usuario}, (err, user) => {
    if(err){
      logger.info(err);
      res.redirect('/');
    }else{
      if(user){
        bcrypt.compare(req.body.password, user.password, (err, resul) => {
          if(resul){
            req.session.user = user;
            res.redirect('/dashboard/');
            logger.info('Usuario ' + req.body.usuario + ' inicio sesion');
          }else{
            logger.info('Contraseña incorrecta');
            res.redirect('/');
          }
        });
      }else{
        logger.info('Usuario: ' + req.body.usuario + ' no encontrado');
        res.redirect('/');
      }
    }
  });
}

function dashboard(req, res, next){
  if(req.session.user){
    //TODO refact
    User.findOne({_id:req.session.user._id}, (err, user) => {
      res.render('dashboard', {'user':user});
    });
  }
}

function show(req, res, next){
  logger.debug("SHOW");
  User.findOne({_id:req.session.user._id},(err, user) => {
    res.render('profile', {'user':user});
  });
}

function edit(req, res, next){
  console.log("EDIT");
  User.findOne({_id:req.params.id},(err, user) => {
    res.render('users/edit', {'user':user});
  });
}

module.exports = {
  index,
  redirect,
  login,
  dashboard,
  show,
  edit
};
