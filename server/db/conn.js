// import { MongoClient } from "mongodb";
const Mongo = require('mongodb').Mongo

// import "../loadEnvironment.js";
const loadEnvironment = require('../loadEnvironment.js')

const connectionString = process.env.ATLAS_URI || "";

// const client = new MongoClient(connectionString);

const client = Mongo.getDB()

let db;

try {
  const clientConnect = async () => {
    console.log("trying to use client.connect()")
    const tempConn = await client.connect();
    console.log("client?: ", client)
    return tempConn
  }
  const conn = clientConnect();
  // const conn = await client.connect();
  if (conn.db) {
    console.log("we in here: ", conn)
    db = conn.db("mern_restaurant");

  }
} catch (e) {
  console.error("ERROR: ", e);
}

module.exports = db;