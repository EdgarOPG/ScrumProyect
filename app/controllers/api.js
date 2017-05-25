// Controller

'use strict'
const express = require('express');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();

const User = require('../models/user');
const Project = require('../models/project');
const UserStory = require('../models/userStory');

const ObjectId = require('mongoose').Types.ObjectId;

var skills = [];

function getAllUsers(req, res, next){
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

function getUserById(req, res, next){
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

function getCurrentProject(req, res, next){
  logger.debug('GET ONE PROYECT');
  if(req.isAuthenticated()){
    //TODO refact
    Project.findById({_id: ObjectId(req.session.currentProject)})
      .populate('productOwner equipoDesarrollo')
      .exec(function(err, project){
        res.json(project);
      });
  } else {
    res.send(403);
  }
}


function getCurrentUsersStories(req, res, next){
  logger.debug('GET ONE PROYECT');
  if(req.isAuthenticated()){
    //TODO refact
    UserStory.find({'project': ObjectId(req.session.currentProject)})
      .exec(function(err, userStories){
        res.json(userStories);
      });
  } else {
    res.send(403);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getMe,
  getCurrentProject,
  getCurrentUsersStories
};
