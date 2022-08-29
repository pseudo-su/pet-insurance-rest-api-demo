var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/mydb';

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(url, function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      console.log('Database created!');

      dbConnection = db.db('mydb');
      console.log('Successfully connected to MongoDB.');

      // clear db from previous run (just for demo purposes)
      // mongodb local server persists records and we want a clean slate each time we start our API server
      dbConnection.collection('pets').deleteMany({});

      let pets = require('./pets.json');

      dbConnection.collection('pets').insertMany(pets, function (err) {
        if (err) {
          return callback(err);
        }
        console.log('1 document inserted');
      });

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
