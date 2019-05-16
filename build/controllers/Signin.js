"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var signin = function signin(db, bcrypt) {
  return function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    db.select("email", "hash").from("login").where("email", "=", email).then(function (data) {
      if (data.length) {
        if (bcrypt.compareSync(password, data[0].hash)) {
          db("users").select("*").where("email", "=", email).then(function (user) {
            return res.status(200).json(user[0]);
          }).catch(function (error) {
            return res.status(400).json("Unable to get user");
          });
        } else {
          res.status(400).json("Wrong credinatials");
        }
      } else {
        res.status(400).json("Wrong credinatials");
      }
    }).catch(function (error) {
      return res.status(400).json("Wrong credinatials");
    });
  };
};

exports.default = signin;
//# sourceMappingURL=Signin.js.map