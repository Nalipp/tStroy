const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt-nodejs');
const slipSchema = require('./slip');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email must be valid'
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (password) => 
      password.length > 6 && password.length < 200,
      message: 'Password must be valid length'
    }
  },
  slips: [slipSchema]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.virtual('slipCount').get(function() {
  let totalMinutes = 0; 
  this.slips.forEach((total) => {
    if (total.minutes) totalMinutes += total.minutes
  });
  return Math.floor(totalMinutes / 60) + ' hours';
});

UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('User', UserSchema);
