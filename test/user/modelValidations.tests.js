const assert = require('assert');
const User = require('../../models/user');

beforeEach((done) => {
  User.remove({}).then(() => {
    done(); 
  });
});

describe('validates User model', () => {

  it('Should validate Email as unique', (done) => {
    const user1 = new User({ 
      email: 'm@mail.com',
      password: 'password'
    });
    const user2 = new User({ 
      email: 'm@mail.com',
      password: 'password'
    });
    
    user1.save()
      .then(() => {
        user2.save((err) => {
          const { message } = err.errors.email;
          assert(message === 'email must be unique');
          done();
        })
      });
  });

  it('Should require an Email', () => {
    const user = new User({
      email: undefined
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.email;
    assert(message === 'Email is required');
  });

  it('Should validate Email as valid', () => {
    const user = new User({ 
      email: 'mm.'
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.email;
    assert(message === 'Email must be valid');
  });

  it('Should require a Password', () => {
    const user = new User({
      password: undefined
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.password;
    assert(message === 'Password is required');
  });

  it('Should validate Password length > 6', () => {
    const user = new User({
      password: 'a',
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.password;
    assert(message === 'Password must be valid length');
  });

  it('Should validate Password length < 200', () => {
    const user = new User({
      password: 'a'.repeat(200),
    });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.password;
    assert(message === 'Password must be valid length');
  });
});
