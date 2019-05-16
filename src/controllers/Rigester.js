const register = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  if (!name || !email || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  // db.select('email').from('users').where('email','=',email)
  db.transaction(trx => {
    trx
      .insert({ hash, email })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            name,
            email: loginEmail[0],
            joined: new Date()
          })
          .then(user => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(error => res.status(400).json("Unable to register"));
};

export default register;
