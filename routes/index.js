var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  let message;
  message = req.flash('loginMessage'); 
  message = req.flash('passwordUpdateMessage'); 
  message = req.flash('signupMessage');
  res.render('users/home', 
    { user: req.user, message: message });
});

module.exports = router;
