var mongoose = require('mongoose');
var url;

mongoose.Promise = global.Promise;

/* eslint-disable no-console */

if (process.env.NODE_ENV === 'dev') {
  url = 'mongodb://localhost:27017/tstoryDev';
} else if (process.env.NODE_ENV === 'test' ) {
  url = 'mongodb://localhost/tstoryTest'
} else {
  url = 'mongodb://heroku_dq13zd86:q5eilfck8e418hr07rtk8v2tqj@ds151433.mlab.com:51433/heroku_dq13zd86';
}

mongoose.connect(url, err => {
  if (err) {
    console.log("# Failed to connect to MongoDB ");
  } else {
    console.log('# Connected to MongoDB', url)
  }
})

