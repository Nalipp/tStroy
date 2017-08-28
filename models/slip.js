const mongoose = require('mongoose');
const validator = require('validator');

const SlipSchema = new mongoose.Schema({
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

SlipSchema.virtual('totalHours').get(function() {
  const totalMinutes = this.minutes
  if (totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return (mins > 0) ? hours + ':' + mins : hours;
  }
  else return null;
});

SlipSchema.virtual('formatedDate').get(function() {
  if (this.date) {
    var month = this.date.getUTCMonth() + 1; //months from 1-12
    var day = this.date.getUTCDate();
    var year = this.date.getUTCFullYear();
    return month + '/' + day + '/' + year;
  }
  else return null;
});
// const Slip = mongoose.model('Slip', SlipSchema)

module.exports = SlipSchema;
