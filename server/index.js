process.env.NODE_ENV = process.env.NODE_ENV || "development";

const mongo = require('./setup/mongo');
const generator = require('./setup/generator');
const server = require('./setup/express');

// Registers all HTTP endpoints
module.exports = require('./routes')(server);
