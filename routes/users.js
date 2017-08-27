const userRepo = require('../repos/user');

module.exports = function(app, passport) {

  app.get('/users', (req, res) => {
    userRepo.getUsers(result => {
      res.render('users/index', 
        { users: result.data, message: 'Something went wrong' });
    });
  });

  app.get('/users/new', (req, res) => {
    const flashMessage = req.flash('signupError');
    const message = (flashMessage.length > 0) ? flashMessage : null; 
    res.render('users/new', { errorMessage: message });
  });

  app.post('/users/new', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/users/new',
    failureFlash : true
  }));

  app.get('/users/login', (req, res) => {
    const flashMessage = req.flash('loginError');
    const message = (flashMessage.length > 0) ? flashMessage : null;
    res.render('users/login', { errorMessage: message });
  });

	app.post('/users/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/users/login',
		failureFlash : true
	}));

  app.get('/users/update_password', isLoggedIn, (req, res) => {
    res.render('users/update_password', { user: req.user });
  });

  app.post('/users/update_password', 
    passport.authenticate('local-password-update', {
    successRedirect : '/',
    failureRedirect : '/users/update_password',
    requireFlash : true
  }));

  app.get('/users/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
      if (err) return next(err);
      res.render('users/home', 
        { infoMessage: 'You are now logged out' });
    });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userRepo.getUser(id, result => {
      res.render('users/show', { user: result.data });
    });
  });

  // get slips 
  app.get('/users/:id/slips', (req, res) => {

  });

  // new form 
  app.get('/users/:id/slips/new', (req, res) => {
    res.render('slips/new', { userId: req.params.id });
  });

  // new post
  app.post('/users/:id/slips/new', isLoggedIn, (req, res) => {
    const newSlip = req.body;
    const id = req.params.id

    if(req.user.id === id) {
      userRepo.getUser(id, user => {
      user.data.slips.push(newSlip);
        userRepo.updateUser(id, user.data, (result) => {
          if (result.err) return res.render('users/' + id, 
            { errorMessage: 'Something went wrong' })
          else res.redirect('/users/' + id) 
        });
      });
    } else {
      res.redirect('/');
    }
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
          { errorMessage: 'Something went wrong' })
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
        { infoMessage: 'Profile was deleted' });
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }
}
