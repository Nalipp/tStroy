const express = require('express');
const router = express.Router();
const slipRepo = require('../repos/slip');

router.get('/', (req, res) => {
  slipRepo.getSlips(result => {
    res.render('slips', 
      {slips: result.data, message: result.err });
  });
});

router.get('/new', (req, res) => {
  res.render('slips/new');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  slipRepo.getSlip(id, result => {
    res.render('slips/show', {slip: result.data});
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  slipRepo.getSlip(id, result => {
    res.render('slips/edit', {slip: result.data});
  });
});

router.post('/new', (req, res) => {
  slipRepo.createSlip(req.body, result => {
    if (result.err) res.render('slips/new', 
      { message: result.err });
    else
    res.redirect('/slips');
  });
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  slipRepo.updateSlip(id, update, (result) => {
    if (result.err)
      res.render('slips/' + id, 
        { message: result.err })
    else res.redirect('/slips/' + id) 
  });
});

router.post('/delete/:id', (req, res) => {
  const id = req.params.id
  slipRepo.deleteSlip(id, () => {
    res.render('slips', { message: 'Time Slip was delted' });
  });
});

module.exports = router;
