const User = require('../models/user');

module.exports = {

  getUsers(cb) {
    User.find({}, (err, users) => {
      const result = { err: err, data: users };
      cb(result);
    });
  },

  createUser(user, cb) {
    User.create(user, (err, user) => {
      const result = { err: err, data: user };
      cb(result);
    });
  },

  getUser(id, cb) {
    User.findById(id, (err, user) => {
      const result = { err: err, data: user };
      cb(result);
    });
  },

  updateUser(id, user, cb) {
    User.findByIdAndUpdate(id, user, (err, user2) => {
      const result = { err: err, data: user2 };
      cb(result);
    });
  },

  deleteUser(id, cb) {
    User.findByIdAndRemove(id, (err, user) => {
      const result = { err: err, data: user };
      cb(result);
    });
  }
}
