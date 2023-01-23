"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("../fs/fileUtil"),
    fileRead = _require2.fileRead;

var router = Router();

var AuthMiddleware = require("../middleware/auth.js");

router.get("/markets", AuthMiddleware, function (req, res) {
  console.log(req.header);
});
module.exports = router;