const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/nodeToyTest');
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Mongoose Warning', error);
    });
});

beforeEach((done) => {
  const { users } = mongoose.connection.collections;
  users.drop(() => done());
});
