// Controller

'use strict'
const express = require('express');
const User = require('../models/user');
const Project = require('../models/project');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();
const ObjectId = require('mongoose').Types.ObjectId;
var skills = [];

//Funcion que llama a todos los User y los regresa en formato JSON
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

//Funcion que obtiene el usuario autenticado y lo regresa  en formato JSON
function getMe(req, res, next){
  logger.debug('GET ME');
  if(req.isAuthenticated()){
    //TODO refact
      res.json(req.user);
  } else {
    res.send(403);
  }
}

//Funcion que obtiene un usuario por su id y lo regresa en formato JSON
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

//Funcion que obtiene un proyecto por su id y lo regresa en formato JSON
function getProjectById(req, res, next){
  logger.debug('GET ONE PROYECT');
  if(req.isAuthenticated()){
    //TODO refact
    Project.findById({_id:ObjectId(req.params.id)})
      .populate('productOwner equipoDesarrollo')
      .exec(function(err, project){
        res.json(project);
      });
  } else {
    res.send(403);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getMe,
  getProjectById
};
