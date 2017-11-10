const expressWinston = require('express-winston');
const _ = require('lodash');
const BPromise = require('bluebird');
const winston = require('winston');

// Logs Express requests.
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      colorize: true,
      timestamp: () => new Date(),
    }),
  ],
  meta: false,
  msg: 'Request: {{req.method}} {{req.url}}',
});

/**
 * Factory function to create a new 'raw' route handler.
 * When using this function directly instead of `createRoute`, you must
 * send a response to express' `res` object.
 */
const createJsonRoute = (func, responseHandler) => (req, res, next) => {
  try {
    const callback = _.isFunction(responseHandler)
      ? func.bind(this, req, res)
      : func.bind(this, req, res, next);

    let valuePromise = callback();
    if (!_.isFunction(_.get(valuePromise, 'then'))) {
      // It was a not a Promise, so wrap it as a Promise
      valuePromise = BPromise.resolve(valuePromise);
    }

    if (_.isFunction(responseHandler)) {
      valuePromise
        .then(data => responseHandler(data, req, res, next))
        .catch(next);
    } else {
      valuePromise.catch(next);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Factory function to create a new route handler
 * This function prevents boilerplate in controllers
 * All services must return a promise
 * If the service is synchronous, they need to e.g. Promise.resolve(1);
 * `func` must return a promise
 * */
const createRoute = func =>
  // eslint-disable-next-line
  createJsonRoute(func, (data, req, res, next) => {
    res.json(data);
  });

module.exports = {
  requestLogger,
  createRoute,
};
