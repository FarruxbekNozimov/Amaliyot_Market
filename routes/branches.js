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

module.exports = router;
