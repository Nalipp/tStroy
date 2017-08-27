const mongoose = require('mongoose');
const validator = require('validator');

const SlipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  language: {
    type: String, 
    required: [true, 'Language is required'],
    validate: {
      validator: (language) => 
      language.length > 1 && language.length < 100,
      message: 'Language must be a valid length' 
    }
  },
  sub_languages: {
    type: String,
    validate: {
      validator: (language) => language.length < 200,
      message: 'Sub languages must be less than 200 characters total'
    }
  },
  study_type: {
    type: String,
    validate: {
      validator: (study_type) => study_type.length < 100,
      message: 'Study type is too long'
    }
  },
  resource_title: {
    type: String,
    validate: {
      validator: (resource_title) => resource_title.length < 100,
      message: 'Resource title is too long'
    }
  },
  description: {
    type: String,
    validate: {
      validator: (description) => description.length < 400,
      message: 'Description is too long'
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
