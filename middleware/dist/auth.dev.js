"use strict";

var _require = require("../fs/fileUtil"),
    fileRead = _require.fileRead;

var jwt = require("jsonwebtoken");

var _require2 = require("../utils/token"),
    generateJWTtoken = _require2.generateJWTtoken;

var AuthMiddleware = function AuthMiddleware(req, res, next) {
  var users = fileRead("users");
  var userId = jwt.verify(req.headers.token, "FarruxDEV");

  for (var i in users) {
    if (userId.userId == users[i].id) return next();
  }

  res.end("User not found");
};

module.exports = AuthMiddleware;