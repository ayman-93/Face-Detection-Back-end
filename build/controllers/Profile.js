"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getProfile = function getProfile(res, req, db) {
  var id = req.params.id;

  console.log(id);
  db.select("*").from("users").where({ id: id }).then(function (user) {
    if (user.length) {
      res.status(200).json(user[0]);
    } else {
      res.status(400).json("User no found");
    }
  }).catch(function (error) {
    return res.status(400).json("Error geting the user");
  });
};

exports.default = getProfile;
//# sourceMappingURL=Profile.js.map