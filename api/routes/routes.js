const express = require('express');
const bodyParser = require('body-parser');

// create application/json parser - used for /post method only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

// routes is an instance of the express router
// We use it to define our API endpoints
// The router will be added as a middleware and will take control of routing requests to the correct endpoint
const routes = express.Router();

// This will help us connect to the database
const dbo = require('../db/db');

// Health check endpoint
// Endpoint to call to ensure your API is up and healthy
// Can use a service to call this and report the health of your API using CI
routes.route('/health').get(async function (_req, res) {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date(),
  };

  res.status(200).send(data);
});

module.exports = routes;
