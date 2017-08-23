const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator')

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
});

UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
const User = mongoose.model('User', UserSchema);

module.exports = User;
