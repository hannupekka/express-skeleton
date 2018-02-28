const express = require('express');
const RateLimit = require('express-rate-limit');
const dummyHttp = require('../http/dummy');

function createRouter() {
  const router = express.Router();

  // Rate limiter.
  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  });
  router.use(limiter);

  // Routes.

  router.get('/hello/:name', dummyHttp.getGreeting);
  router.get('/error', dummyHttp.getError);

  return router;
}

module.exports = createRouter;
