'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Skill = mongoose.model('Skill');

const UserSchema = Schema({
  usuario: String,
  nombre: String,
  provider: String,
  provider_id: {type: String, unique: true},
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
  password: String
});

module.exports = mongoose.model('User', UserSchema);
