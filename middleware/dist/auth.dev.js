"use strict";

var _require = require("../fs/fileUtil"),
    fileRead = _require.fileRead;

var _require2 = require("../utils/token"),
    generateJWTtoken = _require2.generateJWTtoken,
    parseJwt = _require2.parseJwt;

var AuthMiddleware = function AuthMiddleware(req, res, next) {
  var users = fileRead("users");
  console.log("jwt", parseJwt(req.headers.token));

  for (var i in users) {}

  res.end(req.headers.token);
};

module.exports = AuthMiddleware;