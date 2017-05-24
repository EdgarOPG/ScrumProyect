//Controller

'use strict'

const UserStory = require('../models/userStory');
const Project = require('../models/project');
const log4js = require('log4js');
const logger = log4js.getLogger();
const ObjectId = require('mongoose').Types.ObjectId;

function index(req, res, next) {
  if(req.isAuthenticated()) {
  		res.render('dashboard', {'user': req.user})
  }
}

function newCard(req, res, next) {
  logger.debug("NEW USERSTORY");

  if(req.isAuthenticated()){
    //TODO refact
  const userStory = {
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
  res.render('userStories/new', {'user': req.user, 'userStory':userStory})
    };
};

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
  Card.update({_id:req.params.id},{$set: cards}, (err,card) =>{
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
