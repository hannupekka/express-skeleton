const Joi = require('joi');
const { get } = require('lodash');

// Validation schemas.
const common = {
  name: Joi.string()
    .min(1)
    .max(10)
    .required(),
};

const schemas = {
  common,
};

/**
 * Get schema by name.
 * @param {string} name
 */
const getSchema = name => {
  const joiObj = get(schemas, name);
  if (!joiObj) {
    throw new Error(`Schema with name ${name} was not found`);
  }
  return joiObj;
};

/**
 * Throws formatted errors when schema validation fails.
 * @param {object} err
 */
const throwJoiError = err => {
  // See https://github.com/hapijs/joi/blob/v7.2.3/API.md#errors
  const msg = get(err, 'details.0.message') || 'Validation error';
  const newErr = new Error(msg);
  newErr.name = 'JoiValidationError';
  newErr.status = 400;
  throw newErr;
};

/**
 * Validates given object against schema.
 * @param {object} obj
 * @param {string} schemaName
 */
const validate = (obj, schemaName) => {
  const joiObj = getSchema(schemaName);

  const content = { [schemaName]: obj };
  const expected = { [schemaName]: joiObj };

  try {
    Joi.assert(content, expected);
  } catch (err) {
    if (!err.isJoi) {
      throw err;
    }

    throwJoiError(err);
  }

  return obj;
};

module.exports = validate;
