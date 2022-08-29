'use strict';

const express = require('express');

// appRoutes is an instance of the express router
// We use it to define our API endpoints
// The router will be added as a middleware and will take control of routing requests to the correct endpoint
const appRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/db'); // eslint-disable-line no-unused-vars

// Health check endpoint
// Endpoint to call to ensure your API is up and healthy
// Can use a service to call this and report the health of your API
// localhost:3000/health
appRoutes.route('/health').get(async function (_req, res) {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date(),
  };

  res.status(200).send(data);
});

// This route will fetch all pets in the database and return them.
// localhost:3000/pets
appRoutes.route('/pets').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  console.log(dbConnect);

  dbConnect
    .collection('pets')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(500).send('Error fetching pets!');
      } else {
        res.json(result);
      }
    });
});

// This route will return a pet based on the query
// This can't be a GET with a body, it needs to use query params or by path - GET should have no (meaningful) body
// eg: localhost:3000/pets/dog/dalmatian
appRoutes.route('/pets/:type/:breed').get(async function (req, res) {
  const dbConnect = dbo.getDb();

  const query = {
    type: req.params.type,
    breed: req.params.breed,
  };

  console.log('query: ' + JSON.stringify(query));

  dbConnect
    .collection('pets')
    .find(query)
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(500).send('Error fetching pets!');
      } else {
        res.json(result);
      }
    });
});

// This route will return a pet insurance quote, based on pet breed and age.
// http://localhost:3000/pets/quote/dog/dalmatian
appRoutes.route('/pets/quote/:type/:breed').get(async function (req, res) {
  const dbConnect = dbo.getDb();

  const query = {
    type: req.params.type,
    breed: req.params.breed,
  };

  console.log('query: ' + JSON.stringify(query));

  dbConnect
    .collection('pets')
    .find(query)
    .limit(1)
    .toArray(function (err, result) {
      if (err) {
        res.status(500).send('Error fetching listings!');
      } else {
        console.log(JSON.stringify(result));
        const insuranceCost = calculateInsuranceCost(result);
        console.log(insuranceCost);
        res.json({
          insuranceCost,
        });
      }
    });
});

function calculateInsuranceCost(pets) {
  const risk = pets[0].risk;
  const baseCost = 5;

  const quotePerWeek = risk * baseCost;

  const toMoney = quotePerWeek.toLocaleString('en-US', {
    style: 'currency',
    currency: 'AUD',
  });

  return toMoney;
}

// This route adds a pet to the database.
/*  localhost:3000/pets/add
    Set request type to POST
    Set Body to "JSON" in Postman (or add content-type header: "application/json" manually)
    Set payload:
    {
      "type": "dog",
      "breed": "boxer",
      "risk": 3
    }
*/
appRoutes.route('/pets/add').post(function (req, res) {
  const dbConnect = dbo.getDb();

  console.log(req.body);

  const matchDocument = {
    breed: req.body.breed,
    type: req.body.type,
    risk: req.body.risk,
  };

  dbConnect.collection('pets').insertOne(matchDocument, function (err, result) {
    if (err) {
      res.status(500).send('Error inserting record!');
    } else {
      console.log(`Added a new match with id ${result.insertedId}`);
      res.status(201).send();
    }
  });
});

module.exports = {
  appRoutes,
};
