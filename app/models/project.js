'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const ProjectSchema = Schema({
  nombre: String,
  fechaSolicitud: String,
  fechaArranque: String,
  descripcion: String,
  scrumMaster: String,
  productOwner: {
                  type: Schema.Types.ObjectId,
                  ref: 'User'
                },
  equipoDesarrollo: [
                      {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                      }
                    ]
});

module.exports = mongoose.model('Project', ProjectSchema);
