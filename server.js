const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const { appRoutes } = require('./api/routes/routes');

// create application/json parser - used for /post method only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

// get MongoDB driver connection
const dbo = require('./api/db/db');

// get routes
app.use(appRoutes);

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Pet Insurance Calculator REST API server started on: ${PORT}`);
  });
});
