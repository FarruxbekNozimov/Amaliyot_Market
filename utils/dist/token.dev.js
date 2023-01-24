"use strict";

var jwt = require("jsonwebtoken");

var KEY = "FarruxDEV";

var generateJWTtoken = function generateJWTtoken(userId) {
  var accessToken = jwt.sign({
    userId: userId
  }, KEY, {
    expiresIn: "1d"
  });
  return accessToken;
};

module.exports = {
  generateJWTtoken: generateJWTtoken
};