const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

beforeEach((done) => {
  const { users } = mongoose.connection.collections;
  users.drop(() => done());
});
