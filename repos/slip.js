const Slip = require('../models/slip');

module.exports = {

  getSlips(cb) {
    Slip.find({}, (err, slips) => {
      const result = { err: err, data: slips };
      cb(result);
    });
  },

  createSlip(slip, cb) {
    Slip.create(slip, (err, slip) => {
      const result = { err: err, data: slip };
      cb(result);
    });
  },

  getSlip(id, cb) {
    Slip.findById(id, (err, slip) => {
      const result = { err: err, data: slip };
      cb(result);
    });
  },

  updateSlip(id, slip, cb) {
    Slip.findByIdAndUpdate(id, slip, (err, slip2) => {
      const result = { err: err, data: slip2 };
      cb(result);
    });
  },

  deleteSlip(id, cb) {
    Slip.findByIdAndRemove(id, (err, slip) => {
      const result = { err: err, data: slip };
      cb(result);
    });
  }
}
