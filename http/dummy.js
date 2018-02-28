const { get } = require('lodash');
const { createRoute } = require('../utils/express');
const validate = require('../validation');
const dummyCore = require('../core/dummy');

const getGreeting = createRoute(req => {
  const name = validate(get(req, 'params.name'), 'common.name');
  return dummyCore.getGreeting(name);
});

const getError = createRoute(() => {
  const error = new Error('Error message');
  error.status = 418;
  throw error;
});

module.exports = {
  getGreeting,
  getError,
};
