var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const flashMessage = req.flash('updatePasswordSuccess');
  const message = (flashMessage.length > 0) ? flashMessage : null; 
  res.render('users/home', 
    { user: req.user, successMessage: message });
});

module.exports = router;
