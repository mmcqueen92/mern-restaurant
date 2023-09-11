const {MongoClient} = require('mongodb');

const loadEnvironment = require('../loadEnvironment.js')

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

try {
  client.connect().then((res) => {
    if (res.db) {
      db = res.db
    }
    
  })
} catch (e) {
  console.error("ERROR: ", e);
}

module.exports = db;
