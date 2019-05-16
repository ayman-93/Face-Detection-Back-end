const signin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      if (data.length) {
        if (bcrypt.compareSync(password, data[0].hash)) {
          db("users")
            .select("*")
            .where("email", "=", email)
            .then(user => res.status(200).json(user[0]))
            .catch(error => res.status(400).json("Unable to get user"));
        } else {
          res.status(400).json("Wrong credinatials");
        }
      } else {
        res.status(400).json("Wrong credinatials");
      }
    })
    .catch(error => res.status(400).json("Wrong credinatials"));
};

export default signin;
