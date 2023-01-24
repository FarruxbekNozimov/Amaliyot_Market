"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("../fs/fileUtil"),
    fileRead = _require2.fileRead,
    fileWrite = _require2.fileWrite;

var router = Router();

var AuthMiddleware = require("../middleware/auth.js");

router.get("/worker", AuthMiddleware, function (req, res) {
  var workers = fileRead("workers");
  workers.forEach(function (i) {
    return delete i.branchId;
  });
  res.header("Content-Type", "text/json");
  res.end(JSON.stringify(workers));
});
router.get("/worker/:id", AuthMiddleware, function (req, res) {
  var workers = fileRead("workers").find(function (i) {
    return i.id == req.params.id;
  }) || [];
  res.header("Content-Type", "text/json");
  res.end(JSON.stringify(workers));
});
module.exports = router;