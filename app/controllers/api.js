// Controller

'use strict'
const express = require('express');
const User = require('../models/user');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();
var skills = [];

function getAll(req, res, next){
  logger.debug('GET ALL USERS');
  if(req.isAuthenticated()){
    //TODO refact
    User.find((err, users) => {
      res.json(users);
    });
  } else {
    res.send(403);
  }
}

function getMe(req, res, next){
  logger.debug('GET ME');
  if(req.isAuthenticated()){
    //TODO refact
      res.json(req.user);
  } else {
    res.send(403);
  }
}

function getOne(req, res, next){
  logger.debug('GET ONE USER');
  if(req.isAuthenticated()){
    //TODO refact
    User.findById(req.params.id,(err, user) => {
      res.json(user);
    });
  } else {
    res.send(403);
  }
}

function addSkill(req, res, next){
  skills = req.body.skills;
  logger.debug(skills);
}

module.exports = {
  getAll,
  getOne,
  getMe,
  addSkill
};
