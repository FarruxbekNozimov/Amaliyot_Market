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

router.get("/products", AuthMiddleware, function (req, res) {
  var products = fileRead("products");
  products.forEach(function (i) {
    return delete i.branchId;
  });
  res.header("Content-Type", "text/json");
  res.end(JSON.stringify(products));
});
router.get("/products/:id", AuthMiddleware, function (req, res) {
  var products = fileRead("products").find(function (i) {
    return i.id == req.params.id;
  }) || [];
  res.header("Content-Type", "text/json");
  res.end(JSON.stringify(products));
});
router.post("/products", AuthMiddleware, function (req, res) {
  var products = fileRead("products");
  products.push(_objectSpread({
    id: products[products.length - 1].id + 1
  }, req.body));
  fileWrite("products", products);
  res.end("Created successfully");
});
router.put("/products/:id", AuthMiddleware, function (req, res) {
  var products = fileRead("products");

  for (var i = 0; i < products.length; i++) {
    if (products[i].id == req.params.id) {
      products[i] = _objectSpread({}, products[i], {}, req.body);
    }
  }

  fileWrite("products", products);
  res.end("Updated successfully");
});
router["delete"]("/products/:id", AuthMiddleware, function (req, res) {
  var products = fileRead("products");

  for (var i = 0; i < products.length; i++) {
    if (products[i].id == req.params.id) {
      products.splice(i, 1);
    }
  }

  fileWrite("products", products);
  res.end("Deleted successfully");
});
module.exports = router;