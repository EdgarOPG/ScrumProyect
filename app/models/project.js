'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const ProjectSchema = Schema({
  proyecto: String,
  nombre: String,
  fechaSolicitud: String,
  fechaArranque: { type: Date, default: Date.now },
  descripcion: String,
  scrumMaster: String,
  productOwner: {
                  type: Schema.Types.ObjectId,
                  ref: 'User'
                },
  equipoDesarrollo: String
});

module.exports = mongoose.model('Project', ProjectSchema);
