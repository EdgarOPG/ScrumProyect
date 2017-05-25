'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

//Funcion para renderizar el view de sign in
function singin(req, res, next) {
  res.render('singin');
}

//Funcion para hacer log out de la pagina
function logout(req, res) {
    req.logout();
    res.redirect('/');
}

//Funcion que renderiza el dashboard
function dashboard(req, res) {
  if(res.isAuthenticated()){
    res.render('dashboard', {user : req.user});    
  }
}

module.exports = {
  singin,
  logout,
  dashboard
};
