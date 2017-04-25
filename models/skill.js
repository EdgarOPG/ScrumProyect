'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = Schema({
  description: String,
  range: {type:String, enum:['Junior', 'Senior', 'Master']}
});

module.exports = mongoose.model('Skill': SkillSchema);
