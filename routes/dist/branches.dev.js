"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("../fs/fileUtil"),
    fileRead = _require2.fileRead,
    fileWrite = _require2.fileWrite;

var router = Router();

var AuthMiddleware = require("../middleware/auth.js");

router.get("/branches", AuthMiddleware, function (req, res) {
  var branches = fileRead("branches");
  var workers = fileRead("workers");
  var products = fileRead("products");
  var result = [];

  for (var i = 0; i < branches.length; i++) {
    delete branches[i].marketId;
    result.push(branches[i]);
    result[i]["workers"] = [];
    result[i]["products"] = []; // SET WORKERS

    for (var w = 0; w < workers.length; w++) {
      if (workers[w].branchId == branches[i].branchId) {
        delete workers[i].branchId;
        result[i]["workers"].push(workers[i]);
      }
    } // SET PRODUCTS


    for (var _w = 0; _w < products.length; _w++) {
      if (products[_w].branchId == branches[i].branchId) {
        delete products[i].branchId;
        result[i]["products"].push(products[i]);
      }
    }
  }

  res.header("Content-Type", "text/json");
  res.end(JSON.stringify(result));
});
module.exports = router;