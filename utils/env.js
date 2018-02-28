// Get environmental variables.
const { NODE_ENV } = require('../config');

// Make sure NODE_ENV is one of the allowed ones.
if (!['development', 'production', 'test'].includes(NODE_ENV)) {
  throw new Error(`Invalid NODE_ENV ${NODE_ENV}`);
}

const REQUIRED_VARIABLES = {
  development: ['NODE_ENV', 'PORT'],
  test: ['NODE_ENV', 'PORT'],
  production: ['NODE_ENV', 'PORT'],
};

// Makes sure that each required environment variable is set.
const checkEnv = () => {
  REQUIRED_VARIABLES[NODE_ENV].forEach(variable => {
    if (!process.env[variable]) {
      throw new Error(`Missing env variable: ${variable}`);
    }
  });
};

const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';
const isDevelopmentOrTest = isDevelopment || isTest;

module.exports = {
  checkEnv,
  isDevelopment,
  isDevelopmentOrTest,
  isProduction,
  isTest,
};
