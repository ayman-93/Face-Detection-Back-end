"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var register = function register(req, res, db, bcrypt) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;

  var hash = bcrypt.hashSync(password);
  if (!name || !email || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  // db.select('email').from('users').where('email','=',email)
  db.transaction(function (trx) {
    trx.insert({ hash: hash, email: email }).into("login").returning("email").then(function (loginEmail) {
      return trx("users").returning("*").insert({
        name: name,
        email: loginEmail[0],
        joined: new Date()
      }).then(function (user) {
        return res.json(user[0]);
      });
    }).then(trx.commit).catch(trx.rollback);
  }).catch(function (error) {
    return res.status(400).json("Unable to register");
  });
};

exports.default = register;
//# sourceMappingURL=Rigester.js.map