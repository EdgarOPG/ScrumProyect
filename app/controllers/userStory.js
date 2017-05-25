//Controller

'use strict'

const UserStory = require('../models/userStory');
const Project = require('../models/project');
const log4js = require('log4js');
const logger = log4js.getLogger();
const ObjectId = require('mongoose').Types.ObjectId;

function index(req, res, next) {
  if(req.isAuthenticated()) {
  		res.render('projects/dashboard', {'user': req.user})
  }
}

function redirect(req, res, next) {
  if(req.isAuthenticated()) {
  		res.redirect('/projects/' + req.session.currentProject);
  }
}

function newUserStory(req, res, next) {
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
  logger.debug("CREATE USERSTORY");

  let userStory = new UserStory({
    history: req.body.history,
    how: req.body.how,
    whant: req.body.whant,
    some: req.body.some,
    accept: req.body.accept,
    given: req.body.given,
    when: req.body.when,
    then: req.body.then,
    fibonacci: req.body.fibonacci,
    backlog: req.params.backlog,
    project: ObjectId(req.session.currentProject)
  });
  userStory.save((err, object) => {
            if(req.isAuthenticated()){
               next();
           }
         });
}

function edit(req, res, next){
  console.log("EDIT USERSTORY");
  console.log(req.params.id);
  UserStory.findOne({_id: ObjectId(req.params.id)},(err, userStory)=>{
    if(req.isAuthenticated()){
      res.render('userStories/edit', {'userStory':userStory, 'user': req.user});
    }


  });
}

function update(req, res, next){
  logger.debug("UPDATE USERSTORY");
  UserStory.update({_id: ObjectId(req.params.id)},{$set: {
                                                          history: req.body.history,
                                                          how: req.body.how,
                                                          whant: req.body.whant,
                                                          some: req.body.some,
                                                          accept: req.body.accept,
                                                          given: req.body.given,
                                                          when: req.body.when,
                                                          then: req.body.then,
                                                          fibonacci: req.body.fibonacci
                                                         }
                                                  },
  (err,card) =>{
    next();
  });

}


function destroy(req, res, next){
  console.log("DESTROY USERSTORY");
  let code = '';
  let message = '';
  UserStory.findOneAndRemove({ _id: ObjectId(req.params.id)}, (err) =>
  {
    next();
  });
}

module.exports = {
  index,
  newUserStory,
  create,
  edit,
  update,
  destroy,
  redirect
};
