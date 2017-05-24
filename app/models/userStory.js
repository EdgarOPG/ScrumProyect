'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStorySchema = Schema({
  history: String,
  how: String,
  whant: String,
  some: String,
  accept: String,
  given: String,
  when: String,
  then: String,
  fibonacci: String
});

module.exports = mongoose.model('UserStory', UserStorySchema);
