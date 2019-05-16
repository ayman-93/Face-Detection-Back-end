import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/Rigester";
import signin from "./controllers/Signin";
import { imageHandle, apiCall } from "./controllers/Image";
import getProfile from "./controllers/Profile";

const PORT = process.env.port || 3000;
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ayman",
    password: "7533",
    database: "smart-brain"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  db("users")
    .select("*")
    .then(users => {
      res.status(200).json(users);
    });
});

// Sign in
app.post("/signin", (req, res) => signin(db, bcrypt)(req, res));

// Rigester
app.post("/signup", (req, res) => register(req, res, db, bcrypt));

// get Profile
app.get("/profile/:id", (req, res) => getProfile(res, req, db));

//Updete Rank
app.put("/image", (req, res) => imageHandle(req, res, db));

// Get the face dimensions
app.put("/imageurl", (req, res) => apiCall(req, res));

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
