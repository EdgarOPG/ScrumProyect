//Controller

'use strict'

const User = require('../models/user');
const Project = require('../models/project');
const log4js = require('log4js');
const logger = log4js.getLogger();
const ObjectId = require('mongoose').Types.ObjectId;
var collaborators = [];

function index(req, res, next){
  if(req.isAuthenticated()){
    Project.find({productOwner: new ObjectId(req.user._id)}, (err, projects)=>{
  		res.render('projects/list', {'user': req.user, 'projects':projects})
  	});
  }
};

function newProject(req, res, next) {
  logger.debug("NEW PROJECT");

  if(req.isAuthenticated()){
    //TODO refact
  const project = {
    'nombre':'',
    'fechaSollicitud':'',
    'fechaArranque':'',
    'descripcion':'',
    'scrumMaster':'',
    'productOwner':'',
    'equipoDesarrollo':''
  }
  res.render('projects/new', {'user': req.user, 'project':project})
    };
  }

function create(req, res, next){
  logger.debug("CREATE PROJECT");
  let project = new Project({
	  nombre: req.body.nombre,
	  fechaSolicitud: req.body.fechaSolicitud,
	  fechaArranque: req.body.fechaArranque,
	  descripcion: req.body.descripcion,
	  scrumMaster: '',
	  productOwner: req.user._id,
	  equipoDesarrollo: collaborators
  });

 project.save((err, object) => {
           if(req.isAuthenticated()){
              res.redirect('/projects/');
          }
        });
}

function show(req, res, next){
  logger.debug("SHOW");
  req.session.currentProject = req.params.id;
  if(req.isAuthenticated()){
        Project.findOne({ _id:req.params.id}, (err, project) =>{
            res.render('projects/dashboard', {'user':req.user, 'project':project})
    });
  }
}

function addCollaborators(req, res, next) {
  logger.debug("ADD COLLABORATORS");

  if(req.isAuthenticated()){
        Project.findOne({ _id:req.params.id}, (err, project) =>{
            res.render('projects/collaborators', {'user':req.user, 'project':project, 'users':users})
    });
  }

}

function edit(req, res, next){
  logger.debug("EDIT");
  req.session.currentProject = req.params.id;
  if(req.isAuthenticated()){
      Project.findOne({_id: ObjectId(req.params.id)},(err, project)=>{
        res.render('projects/edit', {'project':project, 'user':req.user})
    });
  }
}

function update(req, res, next){
  logger.debug("UPDATE");

let code = '';
let message = '';

if(req.isAuthenticated()){
  logger.debug(req.params.id);
  Project.findByIdAndUpdate({_id: ObjectId(req.params.id)}, {$set: {
     nombre: req.body.nombre,
     fechaSolicitud: req.body.fechaSolicitud,
     fechaArranque: req.body.fechaArranque,
     descripcion: req.body.descripcion,
     equipoDesarrollo: collaborators
   }},
   (err, project) => {
           if(err){
             code = 'danger';
             message = 'No se ha podido actualizar el proyecto.';
           }else{
             code = 'success';
             message = 'Proyecto actualizado Correctamente.';
           }
           res.locals.status = {
             code:code,
             message:message
           };
            res.redirect('/projects/');
         });
}
}

function destroy(req, res, next){
  logger.debug("DESTROY");
  Project.remove({ _id: ObjectId(req.params.id)}, (err) => {

  });
  res.redirect('/projects/');
}

function toObjectId(array){
  let ObjectIds = [];
  for(let i in array){
    console.log(array[i]);
    let temp = new ObjectId(array[i]);
    console.log(temp);
    ObjectIds.push(temp);
  }
  return ObjectIds;
}

function addCollaborators(req, res, next){
  collaborators = toObjectId(req.body.collaborators);
  logger.debug(collaborators);
}

module.exports = {
  index,
  create,
  newProject,
  show,
  addCollaborators,
  edit,
  update,
  destroy
};
