const { Router } = require("express");
const { fileRead, fileWrite } = require("../fs/fileUtil");
const router = Router();
const AuthMiddleware = require("../middleware/auth.js");

router.get("/branches", AuthMiddleware, (req, res) => {
	let branches = fileRead("branches");
	let workers = fileRead("workers");
	let products = fileRead("products");
	let result = [];
	for (let i = 0; i < branches.length; i++) {
		delete branches[i].marketId;
		result.push(branches[i]);
		result[i]["workers"] = [];
		result[i]["products"] = [];
		// SET WORKERS
		for (let w = 0; w < workers.length; w++) {
			if (workers[w].branchId == branches[i].branchId) {
				delete workers[i].branchId;
				result[i]["workers"].push(workers[i]);
			}
		}
		// SET PRODUCTS
		for (let w = 0; w < products.length; w++) {
			if (products[w].branchId == branches[i].branchId) {
				delete products[i].branchId;
				result[i]["products"].push(products[i]);
			}
		}
	}
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(result));
});

router.get("/branches/:id", AuthMiddleware, (req, res) => {
	let branches = fileRead("branches");
	let workers = fileRead("workers");
	let products = fileRead("products");
	let result = {};
	for (let i = 0; i < branches.length; i++) {
		if (branches[i].branchId == req.params.id) {
			delete branches[i].marketId;
			result = branches[i];
			result["workers"] = [];
			result["products"] = [];
			// SET WORKERS
			for (let w = 0; w < workers.length; w++) {
				if (workers[w].branchId == branches[i].branchId) {
					delete workers[i].branchId;
					result["workers"].push(workers[i]);
				}
			}
			// SET PRODUCTS
			for (let w = 0; w < products.length; w++) {
				if (products[w].branchId == branches[i].branchId) {
					delete products[i].branchId;
					result["products"].push(products[i]);
				}
			}
		}
	}
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(result));
});

router.post("/branches", AuthMiddleware, (req, res) => {
	let branches = fileRead("branches");
	branches.push({
		branchId: branches[branches.length - 1].marketId + 1,
		...req.body,
	});
	fileWrite("branches", branches);
	res.end("Created successfully");
});

router.put("/branches/:id", AuthMiddleware, (req, res) => {
	let branches = fileRead("branches");
	for (let i = 0; i < branches.length; i++) {
		if (branches[i].branchId == req.params.id) {
			branches[i] = { ...branches[i], ...req.body };
		}
	}
	fileWrite("branches", branches);
	res.end("Updated successfully");
});

router.delete("/branches/:id", AuthMiddleware, (req, res) => {
	let branches = fileRead("branches");
	for (let i = 0; i < branches.length; i++) {
		if (branches[i].branchId == req.params.id) {
			branches.splice(i, 1);
		}
	}
	fileWrite("branches", branches);
	res.end("Deleted successfully");
});

module.exports = router;
