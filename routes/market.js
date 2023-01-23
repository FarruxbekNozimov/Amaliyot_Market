const { Router } = require("express");
const { fileRead } = require("../fs/fileUtil");
const router = Router();
const AuthMiddleware = require("../middleware/auth.js");

router.get("/markets", AuthMiddleware, (req, res) => {
	console.log(req.header);
});

module.exports = router;
