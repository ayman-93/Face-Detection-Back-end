import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
const PORT = 3001;
const app = express();

const database = {
  user: [
    {
      id: 1,
      name: "Ayman",
      email: "ayman@gmail.com",
      password: "123"
    },
    {
      id: 2,
      name: "Suliman",
      email: "saloom@gmail.com",
      password: "123"
    }
  ]
};
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json(database.user);
});

// Sign in
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.user[0].email &&
    req.body.password === database.user[0].password
  ) {
    res.status(200).json("Success");
  } else {
    res.status(400).json("Faild to signin");
  }
});

// Rigester
app.post("/signup", (req, res) => {
  database.user.push({
    id: database.user.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  res.json(database.user[database.user.length - 1]);
});

// get Profile
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  const profile = database.user.filter(user => user.id === id);
  res.json(profile);
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
