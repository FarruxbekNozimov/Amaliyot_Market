"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("../fs/fileUtil"),
    fileRead = _require2.fileRead;

var _require3 = require("../utils/token"),
    generateJWTtoken = _require3.generateJWTtoken;

var router = Router();
router.post("/login", function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  var users = fileRead("users");
  console.log("salom");

  for (var i in users) {
    if (users[i].username == username && users[i].password == password) {
      var token = generateJWTtoken(users.id);
      res.end(token);
    }
  }
});
module.exports = router;