const http = require('http');

/**
 * Sends response to client on errors.
 * @param {Object} err Error
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Callback
 */

const errorResponder = (err, req, res, next) => {
  const status = err.status ? err.status : 500;
  const httpMessage = http.STATUS_CODES[status];

  const message = status < 500 ? `${httpMessage}: ${err.message}` : httpMessage;
  const response = { message };
  if (err.data) {
    response.errors = err.data;
  }

  res.status(status).send(response);
};

module.exports = errorResponder;
