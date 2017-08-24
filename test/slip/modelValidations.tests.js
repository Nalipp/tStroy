const assert = require('assert');
const Slip = require('../../models/slip');

beforeEach((done) => {
  Slip.remove({}).then(() => {
    done(); 
  });
});

describe('validates Slip model', () => {

  it('Should require a Language', () => {
    const slip = new Slip({
      language: undefined
    });
    const validationResult = slip.validateSync();
    const { message } = validationResult.errors.language;
    assert(message === 'Language is required');
  });

  it('Should validate Language length > 1', () => {
    const slip = new Slip({
      language: 'a',
    });
    const validationResult = slip.validateSync();
    const { message } = validationResult.errors.language;
    assert(message === 'Language must be a valid length');
  });

  it('Should validate Language length < 100', () => {
    const slip = new Slip({
      language: 'a'.repeat(100),
    });
    const validationResult = slip.validateSync();
    const { message } = validationResult.errors.language;
    assert(message === 'Language must be a valid length');
  });

  it('Should validate sub_languages length < 200', () => {
    const slip = new Slip({
      sub_languages: 'a'.repeat(200),
    });
    const validationResult = slip.validateSync();
    const { message } = validationResult.errors.sub_languages;
    assert(message === 'Sub languages must be less than 200 characters total');
  });

  it('Should validate Resource_title length < 100', () => {
    const slip = new Slip({
      resource_title: 'a'.repeat(100),
    });
    const validationResult = slip.validateSync();
    const { message } = validationResult.errors.resource_title;
    assert(message === 'Resource title is too long');
  });

  it('Should validate Description length < 400', () => {
    const slip = new Slip({
      description: 'a'.repeat(400),
    });
    const validationResult = slip.validateSync();
    const { message } = validationResult.errors.description;
    assert(message === 'Description is too long');
  });

  it('Should validate Url as valid', () => {
    const slip = new Slip({
      url: 'www.'
    });
    const validationResult = slip.validateSync(); 
    const { message } = validationResult.errors.url;
    assert(message === 'Url must be valid');
  });
});
