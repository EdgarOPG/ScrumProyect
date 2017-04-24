'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = Schema({
  history: String,
  how: String,
  whant: String,
  some: String,
  accept: String,
  given: String,
  when: String,
  then: String
});

module.exports = mongoose.model('Card', CardSchema);
