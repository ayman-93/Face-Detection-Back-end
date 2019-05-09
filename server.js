import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/Rigester";
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ayman",
    password: "7533",
    database: "smart-brain"
  }
});

const PORT = 3001;
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
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      if (data.length) {
        if (bcrypt.compareSync(password, data[0].hash))
          db("users")
            .select("*")
            .where("email", "=", email)
            .then(user => res.status(200).json(user[0]))
            .catch(error => res.status(400).json("Unable to get user"));
      } else {
        res.status(400).json("Wrong credinatials");
      }
    })
    .catch(error => res.status(400).json("Wrong credinatials"));
});

// Rigester
app.post("/signup", (req, res) => register(req, res, db, bcrypt));

// get Profile
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json("User no found");
      }
    })
    .catch(error => res.status(400).json("Error geting the user"));
});

//Updete Rank
app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(error => res.status(400).json("Some thing wrong"));
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
