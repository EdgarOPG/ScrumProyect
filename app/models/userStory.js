'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('Project');

const UserStorySchema = Schema({
  history: String,
  how: String,
  whant: String,
  some: String,
  accept: String,
  given: String,
  when: String,
  then: String,
  fibonacci: String,
  backlog: String,
  project: {
              type: Schema.Types.ObjectId,
              ref: 'Project'
           }
});

module.exports = mongoose.model('UserStory', UserStorySchema);
