"use strict";

var jwt = require("jsonwebtoken");

var KEY = "FarruxDEV";

var generateJWTtoken = function generateJWTtoken(userId) {
  console.log(userId);
  var accessToken = jwt.sign({
    userId: userId
  }, KEY, {
    expiresIn: "1h"
  });
  return accessToken;
};

function parseJwt(token) {
  console.log("parse", token); // return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

module.exports = {
  generateJWTtoken: generateJWTtoken,
  parseJwt: parseJwt
};