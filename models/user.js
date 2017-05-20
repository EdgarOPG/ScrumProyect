'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Skill = mongoose.model('Skill');

const UserSchema = Schema({
  usuario: String,
  nombre: String,
  primerApellido: String,
  segundoApellido: String,
  fechaNacimiento: String,
  curp: String,
  rfc: String,
  domicilio: String,
  skills: [{
    description: String,
    ranking: {type:String, enum:['Junior', 'Senior', 'Master']}}],
  email: String,
  local            : {
      email        : String,
      password     : String
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  }

});

module.exports = mongoose.model('User', UserSchema);
