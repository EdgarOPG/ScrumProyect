'use strict'
const express = require('express');
const Card = require('../models/card');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();


function index(req, res, next) {
  logger.debug("INDEX");
  Card.find({},(err, cards) => {
    var user = "";
    if(req.session.user){
    res.render('cards/index', {'cards':cards, 'user':user});
   }
  });
}

function newCard(req, res, next){
  logger.debug("NEW");

  const cards = {
  'history':'',
  'how':'',
  'whant':'',
  'some':'',
  'accept':'',
  'given':'',
  'when':'',
  'then':''};

  var user = "";
  if(req.session.user){
    user = req.session.user;
    res.render('cards/new', {'cards':cards, 'user':user});
  }
}

function create(req, res, next){
  logger.debug("CREATE");

  let card = new Card({
    history: req.body.history,
    how: req.body.how,
    whant: req.body.whant,
    some: req.body.some,
    accept: req.body.accept,
    given: req.body.given,
    when: req.body.when,
    then: req.body.then
  });
  card.save((err, object)=>{
    if(err){
    //code = 'danger';
    message = 'No se ha podido guardar el usuario.';
    }else{
    /*code = 'success';
    message = 'Usuario creado Correctamente.';*/
    next();
    }
  });
}

function show(req, res, next){
  console.log("SHOW");
  User.findOne({_id:req.params.id},(err, user)=>{
    res.render('cards/show', {'cards':cards});
  });

}

function edit(req, res, next){
  console.log("EDIT");
  Card.findOne({_id:req.params.id},(err, user)=>{
    res.render('cards/edit', {'cards':cards});
  });
}

function update(req, res, next){
  console.log("UPDATE");
  res.locals.status = {
    code:'success',
    message:'Card actualizada Correctamente.'
  };
  next();
}

function destroy(req, res, next){
  console.log("DESTROY");
  res.locals.status = {
    code:'success',
    message:'Card eliminado Correctamente.'
  };
  next();
}


module.exports = {
    index,
    newCard,
    create,
    show,
    edit,
    update,
    destroy

};
