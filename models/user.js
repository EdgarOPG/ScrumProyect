'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  usuario: String,
  nombre: String,
  primerApellido: String,
  segundoApellido: String,
  fechaNacimiento: String,
  curp: String,
  rfc: String,
  domicilio: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
