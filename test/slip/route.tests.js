const assert = require('assert');
const app = require('./../../app');
const request = require('supertest');
const slipRepo = require('../../repos/slip');
const Slip = require('../../models/slip');
const ObjectID = require('mongodb').ObjectID;

const slips = [
  {
    _id: new ObjectID(),
    language: 'javaScript',
  }, 
  {
    _id: new ObjectID(),
    language: 'ruby',
  }
]

beforeEach((done) => {
  Slip.remove({}).then(() => {
    return Slip.insertMany(slips);
  }).then(() => done());
});

describe('Slip get requests', () => {
  it('should GET /slips index page', (done) => {
    request(app)
      .get('/slips/')
      .end((err, response) => {
        assert(response.status === 200);
        done();
      })
  });

  it('should GET /slip/:id slip show page', (done) => {
    request(app)
      .get('/slips/' + slips[0]._id)
      .end((err, response) => {
        assert(response.status === 200);
        done();
      })
  });

  it('should GET /slips/new slip form', (done) => {
    request(app)
      .get('/slips/new')
      .end((err, response) => {
        assert(response.text.includes('form id="slip-new"'));
        assert(response.status === 200);
        done();
      })
  });
});

describe('SlipRepo database GET requests', () => {
  it('should GET all Slips from database', (done) => {
    slipRepo.getSlips((slips) => {
      assert(slips.data.length === 2);
      done();
    });
  });

  it('should GET a Slip from database', (done) => {
    slipRepo.getSlip(slips[0]._id, (slip) => {
      assert(slip.data.language === 'javaScript');
      done();
    });
  });
});

describe('SlipRepo database POST requests', () => {
  it('should POST a new Slips to database', (done) => {
    const newSlip = {
      language: 'a@a.com',
    }
    slipRepo.createSlip(newSlip, () => {
      slipRepo.getSlips((slips) => {
        assert(slips.data.length === 3);
        done();
      });
    });
  });
  it('should POST an update to an existing Slip', (done) => {
    const update = slips[0]
    update.language = 'python'
    slipRepo.updateSlip(slips[0]._id, update, () => {
      slipRepo.getSlips((slips) => {
        assert(slips.data[0].language === 'python');
        done();
      });
    });
  });

  it('should POST a delete request to slip', (done) => {
    slipRepo.deleteSlip(slips[0]._id, () => {
      slipRepo.getSlips((slips) => {
        assert(slips.data.length === 1);
        done();
      });
    });
  });
});
