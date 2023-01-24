"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
router.get("/branches/:id", AuthMiddleware, function (req, res) {
  var branches = fileRead("branches");
  var workers = fileRead("workers");
  var products = fileRead("products");
  var result = {};

  for (var i = 0; i < branches.length; i++) {
    if (branches[i].branchId == req.params.id) {
      delete branches[i].marketId;
      result = branches[i];
      result["workers"] = [];
      result["products"] = []; // SET WORKERS

      for (var w = 0; w < workers.length; w++) {
        if (workers[w].branchId == branches[i].branchId) {
          delete workers[i].branchId;
          result["workers"].push(workers[i]);
        }
      } // SET PRODUCTS


      for (var _w2 = 0; _w2 < products.length; _w2++) {
        if (products[_w2].branchId == branches[i].branchId) {
          delete products[i].branchId;
          result["products"].push(products[i]);
        }
      }
    }
  }

  res.header("Content-Type", "text/json");
  res.end(JSON.stringify(result));
});
router.post("/branches", AuthMiddleware, function (req, res) {
  var branches = fileRead("branches");
  branches.push(_objectSpread({
    branchId: branches[branches.length - 1].marketId + 1
  }, req.body));
  fileWrite("branches", branches);
  res.end("Created successfully");
});
router.put("/branches/:id", AuthMiddleware, function (req, res) {
  var branches = fileRead("branches");

  for (var i = 0; i < branches.length; i++) {
    if (branches[i].branchId == req.params.id) {
      branches[i] = _objectSpread({}, branches[i], {}, req.body);
    }
  }

  fileWrite("branches", branches);
  res.end("Updated successfully");
});
module.exports = router;