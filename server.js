'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { appRoutes } = require('./api/routes/routes');

// create application/json parser - used for /post method only
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// get MongoDB driver connection
const dbo = require('./api/db/db');

// get routes
app.use(appRoutes);

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    throw err;
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Pet Insurance Calculator REST API server started on: ${PORT}`);
  });
});
