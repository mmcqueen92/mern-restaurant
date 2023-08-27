import { MongoClient } from "mongodb";

import "../loadEnvironment.mjs";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

try {
  const conn = await client.connect();
  if (conn) {
    db = conn.db("mern_restaurant");

  }
} catch (e) {
  console.error("ERROR: ", e);
}

export default db;