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
router.post("/worker", AuthMiddleware, function (req, res) {
  var workers = fileRead("workers");
  workers.push(_objectSpread({
    id: workers[workers.length - 1].id + 1
  }, req.body));
  fileWrite("workers", workers);
  res.end("Created successfully");
});
router.put("/worker/:id", AuthMiddleware, function (req, res) {
  var workers = fileRead("workers");

  for (var i = 0; i < workers.length; i++) {
    if (workers[i].id == req.params.id) {
      workers[i] = _objectSpread({}, workers[i], {}, req.body);
    }
  }

  fileWrite("workers", workers);
  res.end("Updated successfully");
});
router["delete"]("/worker/:id", AuthMiddleware, function (req, res) {
  var workers = fileRead("workers");

  for (var i = 0; i < workers.length; i++) {
    if (workers[i].id == req.params.id) {
      workers.splice(i, 1);
    }
  }

  fileWrite("workers", workers);
  res.end("Deleted successfully");
});
module.exports = router;