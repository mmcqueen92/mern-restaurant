import express from "express"
import cors from "cors"
import db from "./db/conn.mjs";
import "./loadEnvironment.mjs";



const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
// app.use(express.json());

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log("DB STATS: ", await db.stats())

})