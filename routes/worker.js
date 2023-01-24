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

router.post("/worker", AuthMiddleware, (req, res) => {
	let workers = fileRead("workers");
	workers.push({
		id: workers[workers.length - 1].id + 1,
		...req.body,
	});
	fileWrite("workers", workers);
	res.end("Created successfully");
});

router.put("/worker/:id", AuthMiddleware, (req, res) => {
	let workers = fileRead("workers");
	for (let i = 0; i < workers.length; i++) {
		if (workers[i].id == req.params.id) {
			workers[i] = { ...workers[i], ...req.body };
		}
	}
	fileWrite("workers", workers);
	res.end("Updated successfully");
});

router.delete("/worker/:id", AuthMiddleware, (req, res) => {
	let workers = fileRead("workers");
	for (let i = 0; i < workers.length; i++) {
		if (workers[i].id == req.params.id) {
			workers.splice(i, 1);
		}
	}
	fileWrite("workers", workers);
	res.end("Deleted successfully");
});

module.exports = router;
