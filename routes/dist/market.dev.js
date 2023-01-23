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

router.get("/markets", AuthMiddleware, function (req, res) {
  var markets = fileRead("markets");
  var branches = fileRead("branches");
  var result = [];

  for (var i = 0; i < markets.length; i++) {
    result[i] = _objectSpread({}, markets[i]);

    for (var j = 0; j < branches.length; j++) {
      if (branches[j].marketId == markets[i].marketId) {
        result[i]["branches"] = branches[j];
        delete result[i]["branches"].marketId;
      }
    }
  }

  res.end(JSON.stringify(result));
});
router.post("/markets", AuthMiddleware, function (req, res) {
  var markets = fileRead("markets");
  markets.push(_objectSpread({
    marketId: markets[markets.length - 1].marketId + 1
  }, req.body));
  fileWrite("markets", markets);
  res.end("Created successfully");
});
module.exports = router;