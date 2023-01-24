const { Router } = require("express");
const { fileRead, fileWrite } = require("../fs/fileUtil");
const router = Router();
const AuthMiddleware = require("../middleware/auth.js");

router.get("/worker", AuthMiddleware, (req, res) => {
	let workers = fileRead("workers");
	workers.forEach((i) => delete i.branchId);
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(workers));
});

router.get("/worker/:id", AuthMiddleware, (req, res) => {
	let workers = fileRead("workers").find((i) => i.id == req.params.id) || [];
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(workers));
});

module.exports = router;
