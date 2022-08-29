const express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000;

// get MongoDB driver connection
const dbo = require('./api/db/db');

// get routes
app.use(require('./api/routes/routes'));

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
