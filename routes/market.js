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
		for (let j = 0; j < branches.length; j++) {
			if (branches[j].marketId == markets[i].marketId) {
				result[i]["branches"] = branches[j];
				delete result[i]["branches"].marketId;
			}
		}
	}
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

module.exports = router;
