const mongoose = require('mongoose');
const validator = require('validator');

const SlipSchema = new mongoose.Schema({
  language: {
    type: String, 
    required: [true, 'Language is required'],
    validate: {
      validator: (language) => 
      language.length > 1 && language.length < 100,
      message: 'Language must be valid length'
    }
  },
  sub_languages: [String],
  study_type: {
    type: String,
    validate: {
      validator: (study_type) => 
      study_type.length > 1 && study_type.length < 100,
      message: 'Study type must be valid length'
    }
  },
  resource_title: {
    type: String,
    validate: {
      validator: (resource_title) => 
      resource_title.length > 1 && resource_title.length < 100,
      message: 'Resource title must be valid length'
    }
  },
  description: {
    type: String,
    validate: {
      validator: (description) => 
      description.length > 1 && description.length < 400,
      message: 'Description must be valid length'
    }
  },
  url: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Url must be valid'
    },
  },
  minutes: Number,
  date: Date
});

const Slip = mongoose.model('Slip', SlipSchema)

module.exports = Slip;
