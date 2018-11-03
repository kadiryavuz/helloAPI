/*
* create and export configuration variables
*
*/


// building the container for included environments
var environments = {};

// staging environment
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
};


// production environment
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
};


// determine the environment passed over command-line
const currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check current env if it's one of the environments defined above
const environmentVal = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

module.exports = environmentVal;