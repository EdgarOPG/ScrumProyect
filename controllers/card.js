'use strict'
const express = require('express');
const Card = require('../models/card');
const log4js = require('log4js');
const bcrypt = require('bcrypt-nodejs');
const logger = log4js.getLogger();


function index(req, res, next) {
  logger.debug("INDEX");

  var card ="";
  if(req.session.card){
    card = req.session.card;
  }
  Card.find({},(err, cards)=>{
    res.render('cards/index');
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

  res.render('cards/index', {'cards':cards});
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
}

/*function show(req, res, next){
}

function edit(req, res, next){
}

function update(req, res, next){
}

function destroy(req, res, next){
}
*/

module.exports = {
    index,
    newCard,
    create,
/*  show,
    edit,
    update,
    destroy
*/
};
