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
  'then':'',
  'fibonacci':''
};

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
    then: req.body.then,
    fibonacci: req.body.fibonacci

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

function edit(req, res, next){
  console.log("EDIT");
  Card.findOne({_id:req.params.id},(err, cards)=>{
    var user = "";
    if(req.session.user){
    user = req.session.user;
    res.render('cards/edit', {'cards':cards, 'user':user});
    }


  });
}

/*function update(req, res, next){
  console.log("UPDATE");
  let code = '';
  let message = '';
  Card.insert({ _id: req.params.id },
    {$set: {
      history: req.body.history,
      how: req.body.how,
      whant: req.body.whant,
      some: req.body.some,
      accept: req.body.accept,
      given: req.body.given,
      when: req.body.when,
      then: req.body.then
    }},
    (err,cards) => {
    if (err) {
      res.locals.status = {
        code:'error',
        message:'El Card no fue actualizado.'
      };
    }
    else {
      res.locals.status = {
        code:'success',
        message:'Card actualizado Correctamente.'
      };
    }
});
  next();
}*/

function update(req, res, next){
  logger.debug("UPDATE");
  let cards = {
    history: req.body.history,
    how: req.body.how,
    whant: req.body.whant,
    some: req.body.some,
    accept: req.body.accept,
    given: req.body.given,
    when: req.body.when,
    then: req.body.then,
    fibonacci: req.body.fibonacci

  };
  Card.update({_id:req.params.id},{$set: card}, (err,card) =>{
    next();
  });

}


function destroy(req, res, next){
  console.log("DESTROY");
  let code = '';
  let message = '';
  Card.remove({ _id: req.params.id }, (err) => {
    if (!err) {
      res.locals.status = {
        code:'error',
        message:'Card fue eliminado Correctamente.'
      };
    }
    else {
      res.locals.status = {
        code:'success',
        message:'Card no fue eliminado.'
      };
    }
});
  next();
}

module.exports = {
    index,
    newCard,
    create,
    edit,
    update,
    destroy

};
