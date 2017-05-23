'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

function singin(req, res, next) {
  res.render('singin');
}

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

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
