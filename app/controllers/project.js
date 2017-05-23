//Controller

'use strict'

const User = require('../models/user');
const Project = require('../models/project');
const log4js = require('log4js');
const logger = log4js.getLogger();
const ObjectId = require('mongoose').Types.ObjectId;

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
    'proyecto':'',
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
	logger.debug(req.user._id);
  let project = new Project({
    proyecto: req.body.proyecto,
	  nombre: req.body.nombre,
	  fechaSolicitud: req.body.fechaSolicitud,
	  fechaArranque: req.body.fechaArranque,
	  descripcion: req.body.descripcion,
	  scrumMaster: '',
	  productOwner: req.user._id,
	  equipoDesarrollo: ''
  });

let code = '';
let message = '';

 project.save((err, object) => {
          if(err){
            code = 'danger';
            message = 'No se ha podido guardar el proyecto.';
          }else{
            code = 'success';
            message = 'Proyecto creado Correctamente.';
          }
          res.locals.status = {
            code:code,
            message:message
          };
           if(req.isAuthenticated()){
              //TODO refact
                Project.find({productOwner: new ObjectId(req.user._id)}, (err, projects)=>{
                res.render('projects/list', {'user':req.user, 'projects':projects})
            });
          }
        });
}

function show(req, res, next){
  logger.debug("SHOW");
    Project.findOne({_id:req.params.id},(err, project) => {
        res.render('dashboard', {'user':req.user, 'project':project});
  });
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

  if(req.isAuthenticated()){
      Project.findOne({_id:req.params.id},(err, project)=>{
        res.render('projects/edit', {'project':project, 'user':req.user})
    });
  }
}

function update(req, res, next){
  logger.debug("UPDATE");

let code = '';
let message = '';

 Project.update({_id:req.params.id},
  {$set: {
    proyecto: req.body.proyecto,
    nombre: req.body.nombre,
    fechaSolicitud: req.body.fechaSolicitud,
    fechaArranque: req.body.fechaArranque,
    descripcion: req.body.descripcion
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
           if(req.isAuthenticated()){
                Project.find({productOwner: new ObjectId(req.user._id)}, (err, projects)=>{
                res.render('projects/list', {'user':req.user, 'projects':projects})
              });
          }
        });
}

function destroy(req, res, next){
  logger.debug("DESTROY");
  Project.remove({ _id: req.params.id }, (err) => {
    if (err) {
        res.locals.status = {
          code:'error',
          message:'El Proyecto no fue eliminado.'
        };
      }
      else {
        res.locals.status = {
          code:'success',
          message:'Proyecto eliminado correctamente.'
        };
      }
  });
  next();

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
