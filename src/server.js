import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/Rigester";
import signin from "./controllers/Signin";
import { imageHandle, apiCall } from "./controllers/Image";
import getProfile from "./controllers/Profile";

const PORT = process.env.PORT || 3001;
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(bodyParser.json());

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

app.listen(PORT, () =>
  console.log(
    `app is running on port ${PORT} databaseUrl ${process.env.DATABASE_URL}`
  )
);
