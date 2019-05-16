"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCall = exports.imageHandle = undefined;

var _clarifai = require("clarifai");

var _clarifai2 = _interopRequireDefault(_clarifai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _clarifai2.default.App({
  apiKey: "06ce844135c1448abb5cae021c520b4a"
});

var apiCall = function apiCall(req, res) {
  app.models.predict(_clarifai2.default.FACE_DETECT_MODEL, req.body.input).then(function (data) {
    return res.status(200).json(data);
  }).catch(function (error) {
    return res.status(400).json("error");
  });
};

var imageHandle = function imageHandle(req, res, db) {
  var id = req.body.id;

  db("users").where("id", "=", id).increment("entries", 1).returning("entries").then(function (entries) {
    return res.json(entries[0]);
  }).catch(function (error) {
    return res.status(400).json("Some thing wrong");
  });
};

exports.imageHandle = imageHandle;
exports.apiCall = apiCall;
//# sourceMappingURL=Image.js.map