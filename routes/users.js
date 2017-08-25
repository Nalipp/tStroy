const userRepo = require('../repos/user');

module.exports = function(app, passport) {

  app.get('/', (req, res) => {
    res.render('/', { user: req.user });
  });

  app.get('/users', (req, res) => {
    userRepo.getUsers(result => {
      res.render('users/index', 
        { users: result.data, message: result.err });
    });
  });

  app.get('/users/new', (req, res) => {
    res.render('users/new', { message: req.flash('signupMessage') });
  });

  app.post('/users/new', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/users/new',
    failureFlash : true
  }));

  app.get('/users/login', (req, res) => {
    res.render('users/login', { message: req.flash('loginMessage') });
  });

	app.post('/users/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/users/login',
		failureFlash : true
	}));

  app.get('/users/update_password', isLoggedIn, (req, res) => {
    res.render('users/update_password', { user: req.user });
  });

  app.post('/users/update_password', passport.authenticate('local-password-update', {
    successRedirect : '/',
    failureRedirect : '/users/update_password',
    requireFlash : true
  }));

  app.get('/users/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userRepo.getUser(id, result => {
      res.render('users/show', { user: result.data });
    });
  });

  app.get('/users/edit/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    userRepo.getUser(id, result => {
      res.render('users/edit', { user: result.data });
    });
  });

  app.post('/users/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if(req.user.id === id) {
      userRepo.updateUser(id, update, (result) => {
        if (result.err) return res.render('users/' + id, 
          { message: result.err })
        else res.redirect('/users/' + id) 
      });
    } else {
      res.redirect('/');
    }
  });

  app.post('/users/delete/:id', (req, res) => {
    const id = req.params.id
    userRepo.deleteUser(id, () => {
      res.render('users/home', 
        { message: 'Profile was delted' });
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }
}
