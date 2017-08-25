const assert = require('assert');
const app = require('./../../app');
const request = require('supertest');
const userRepo = require('../../repos/user');
const User = require('../../models/user');
const ObjectID = require('mongodb').ObjectID;

const users = [
  {
    _id: new ObjectID(),
    email: 'joe@mail.com',
    password: 'password1'
  }, 
  {
    _id: new ObjectID(),
    email: 'jane@mail.com',
    password: 'password2'
  }
]

beforeEach((done) => {
  User.remove({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
});

describe('User get requests', () => {
  it('should GET /users index page', (done) => {
    request(app)
      .get('/users/')
      .end((err, response) => {
        assert(response.status === 200);
        done();
      })
  });

  it('should GET /user/:id user show page', (done) => {
    request(app)
      .get('/users/' + users[0]._id)
      .end((err, response) => {
        assert(response.status === 200);
        done();
      })
  });

  it('should GET /users/new user form', (done) => {
    request(app)
      .get('/users/new')
      .end((err, response) => {
        assert(response.text.includes('form id="user-new"'));
        assert(response.status === 200);
        done();
      })
  });

  it('should GET /users/login user form', (done) => {done()});  
});

describe('UserRepo database GET requests', () => {
  it('should GET all Users from database', (done) => {
    userRepo.getUsers((users) => {
      assert(users.data.length === 2);
      done();
    });
  });

  it('should GET a User from database', (done) => {
    userRepo.getUser(users[0]._id, (user) => {
      assert(user.data.email === 'joe@mail.com');
      done();
    });
  });
});

describe('UserRepo database POST requests', () => {
  it('should POST a new Users to database', (done) => {
    const newUser = {
      email: 'a@a.com',
      password: 'password'
    }
    userRepo.createUser(newUser, () => {
      userRepo.getUsers((users) => {
        assert(users.data.length === 3);
        done();
      });
    });
  });
  it('should POST an update to an existing User', (done) => {
    const update = users[0]
    update.email = 'jj@mail.com'
    userRepo.updateUser(users[0]._id, update, () => {
      userRepo.getUsers((users) => {
        assert(users.data[0].email === 'jj@mail.com');
        done();
      });
    });
  });

  it('should POST a delete request to user', (done) => {
    userRepo.deleteUser(users[0]._id, () => {
      userRepo.getUsers((users) => {
        assert(users.data.length === 1);
        done();
      });
    });
  });
});
