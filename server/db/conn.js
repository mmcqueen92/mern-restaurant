const {MongoClient} = require('mongodb');

const loadEnvironment = require('../loadEnvironment.js')

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

// try {
//   client.connect().then((res) => {
//     if (res.db) {
//       db = res.db
//     }
    
//   })
// } catch (e) {
//   console.error("ERROR: ", e);
// }

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};
