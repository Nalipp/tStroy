var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'dev') {
  url = 'mongodb://localhost:27017/nodeToyDev';
} else {
  url = 'mongodb://localhost:27017/nodeToy';
}

mongoose.connect(url, err => {
  if (err) {
    console.log("# Failed to connect to MongoDB ");
  } else {
    console.log('# Connected to MongoDB')
  }
})

