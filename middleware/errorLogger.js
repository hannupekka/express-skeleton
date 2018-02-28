const { isTest } = require('../utils/env');
const logger = require('../utils/logger');

/**
 * Logs errors to console.
 * @param {Object} err Error
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Callback
 */
const errorLogger = (err, req, res, next) => {
  if (isTest) {
    return next(err);
  }

  const status = err.status ? err.status : 500;
  if (status >= 400) {
    logger.error(`${err.status} ${err.message}`);
    if (status >= 500) {
      logger.error(err.stack);
    }
  }

  return next(err);
};

module.exports = errorLogger;
