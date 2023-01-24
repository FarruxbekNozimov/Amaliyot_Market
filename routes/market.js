const { Router } = require("express");
const { fileRead, fileWrite } = require("../fs/fileUtil");
const router = Router();
const AuthMiddleware = require("../middleware/auth.js");

router.get("/markets", AuthMiddleware, (req, res) => {
	let markets = fileRead("markets");
	let branches = fileRead("branches");
	let result = [];
	for (let i = 0; i < markets.length; i++) {
		result[i] = { ...markets[i] };
		result[i]["branches"] = [];
		for (let j = 0; j < branches.length; j++) {
			if (branches[j].marketId == markets[i].marketId) {
				delete branches[j].marketId;
				result[i]["branches"].push(branches[j]);
			}
		}
	}
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(result));
});

router.post("/markets", AuthMiddleware, (req, res) => {
	let markets = fileRead("markets");
	markets.push({
		marketId: markets[markets.length - 1].marketId + 1,
		...req.body,
	});
	fileWrite("markets", markets);
	res.end("Created successfully");
});

router.put("/markets/:id", AuthMiddleware, (req, res) => {
	let markets = fileRead("markets");
	for (let i = 0; i < markets.length; i++) {
		if (markets[i].marketId == req.params.id) {
			markets[i] = { ...markets[i], ...req.body };
		}
	}
	fileWrite("markets", markets);
	res.end("Updated successfully");
});

router.delete("/markets/:id", AuthMiddleware, (req, res) => {
	let markets = fileRead("markets");
	for (let i = 0; i < markets.length; i++) {
		if (markets[i].marketId == req.params.id) {
			markets.splice(i, 1);
		}
	}
	fileWrite("markets", markets);
	res.end("Deleted successfully");
});

router.get("/markets/:id", AuthMiddleware, (req, res) => {
	let markets = fileRead("markets");
	let branches = fileRead("branches");
	let workers = fileRead("workers");
	let products = fileRead("products");
	let result = {};
	let isThere = markets.find((x) => x.marketId == req.params.id);
	if (!isThere) return res.end("404 || This market not found");
	result = { ...isThere };

	// SET ALL WITH FILTER
	let findBranches =
		branches.filter((x) => x.marketId == result.marketId) || [];
	result["branches"] = findBranches;

	result["branches"] = findBranches.map((x) => ({
		...x,
		workers: workers.filter((w) => w.branchId == x.branchId),
		products: products.filter((w) => w.branchId == x.branchId),
	}));

	// DELETE SOME KEYS
	result["branches"].forEach((i) => {
		i["workers"].forEach((i) => delete i.branchId);
		i["products"].forEach((i) => delete i.branchId);
		delete i.marketId;
	});

	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(result));
});

module.exports = router;
