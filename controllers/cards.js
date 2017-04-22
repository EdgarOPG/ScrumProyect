'use strict'

const express = require('express');
const User = require('../models/card');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();


function newCard(req, res, next){
  logger.debug("NEW");


  var cards ="";
  if(req.session.user){
    cards = req.session.cards;
  }
  User.find({},(err, cards)=>{
    res.render('/cards', {'cards':cards, 'card':card,
     'status': res.locals.status});
  });


  const cards = {

  'history':'',
  'how':'',
  'whant':'',
  'some':'',
  'accept':'',
  'given':'',
  'when':'',
  'then':''
};

  res.render('users/new', {'user':user});
}

function create(req, res, next){
  logger.debug("CREATE");



  let user = new Cards({
    history: req.body.history,
    how: req.body.how,
    whant: req.body.whant,
    some: req.body.some,
    accept: req.body.accept,
    given: req.body.given,
    when: req.body.when,
    then: req.body.then
  });


  module.exports = {
    index,
    newCard,
  };
