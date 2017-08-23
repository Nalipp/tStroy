const express = require('express');
const router = express.Router();
const userRepo = require('../repos/user');

router.get('/', (req, res) => {
  userRepo.getUsers(result => {
    res.render('users', 
      {users: result.data, message: result.err });
  });
});

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  userRepo.getUser(id, result => {
    res.render('users/show', {user: result.data});
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  userRepo.getUser(id, result => {
    res.render('users/edit', {user: result.data});
  });
});

router.post('/new', (req, res) => {
  userRepo.createUser(req.body, result => {
    if (result.err) res.render('users/new', 
      { message: result.err });
    else
    res.redirect('/users');
  });
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  userRepo.updateUser(id, update, (result) => {
    if (result.err)
      res.render('users/' + id, 
        { message: result.err })
    else res.redirect('/users/' + id) 
  });
});

router.post('/delete/:id', (req, res) => {
  const id = req.params.id
  userRepo.deleteUser(id, () => {
    res.render('users', { message: 'Profile was delted' });
  });
});

module.exports = router;
