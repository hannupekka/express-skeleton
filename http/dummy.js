const { get } = require('lodash');
const { createRoute } = require('../utils/express');
const validate = require('../validation');
const dummyCore = require('../core/dummy');

const getGreeting = createRoute(req => {
  const name = validate(get(req, 'params.name'), 'common.name');
  return dummyCore.getGreeting(name);
});

module.exports = {
  getGreeting,
};
