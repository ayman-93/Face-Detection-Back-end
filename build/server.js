"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _bcryptNodejs = require("bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _knex = require("knex");

var _knex2 = _interopRequireDefault(_knex);

var _Rigester = require("./controllers/Rigester");

var _Rigester2 = _interopRequireDefault(_Rigester);

var _Signin = require("./controllers/Signin");

var _Signin2 = _interopRequireDefault(_Signin);

var _Image = require("./controllers/Image");

var _Profile = require("./controllers/Profile");

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.port || 3000;
var db = (0, _knex2.default)({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ayman",
    password: "7533",
    database: "smart-brain"
  }
});

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.get("/", function (req, res) {
  db("users").select("*").then(function (users) {
    res.status(200).json(users);
  });
});

// Sign in
app.post("/signin", function (req, res) {
  return (0, _Signin2.default)(db, _bcryptNodejs2.default)(req, res);
});

// Rigester
app.post("/signup", function (req, res) {
  return (0, _Rigester2.default)(req, res, db, _bcryptNodejs2.default);
});

// get Profile
app.get("/profile/:id", function (req, res) {
  return (0, _Profile2.default)(res, req, db);
});

//Updete Rank
app.put("/image", function (req, res) {
  return (0, _Image.imageHandle)(req, res, db);
});

// Get the face dimensions
app.put("/imageurl", function (req, res) {
  return (0, _Image.apiCall)(req, res);
});

app.listen(PORT, function () {
  return console.log("app is running on port " + PORT);
});
//# sourceMappingURL=server.js.map