const userRepo = require('../repos/user');
const slipRepo = require('../repos/slip');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tstoryDev', err => {
  if (err) {
    console.log("# Failed to connect to MongoDB ");
  } else {
    console.log('# Connected to MongoDB')
  }
})

const usersArr = [
  {
    email: 'jane@mail.com',
    password: 'password'
  }, 
  {
    email: 'joe@mail.com',
    password: 'password'
  }
]

const slipsArr = [
  {
    language: 'javaScript'
  },
  {
    language: 'ruby'
  }
]

const { users, slips } = mongoose.connection.collections;
users.drop(() => {
  slips.drop(() => {

    userRepo.createUser(usersArr, results => {
      /* eslint-disable no-console */
      console.log(results.data);
      slipRepo.createSlip(slipsArr, results => {
        console.log(results.data); 
        mongoose.disconnect();
      });
    });


  });
});
