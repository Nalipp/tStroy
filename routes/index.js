var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const message = [];
  if (req.flash('signupMessage').length > 0) 
    message.push(req.flash('signupMessage')); 
  if (req.flash('loginMessage').length > 0) 
    message.push(req.flash('loginMessage')); 
  console.log(message);
  res.render('users/home', 
    { user: req.user, message: message });
});

module.exports = router;
