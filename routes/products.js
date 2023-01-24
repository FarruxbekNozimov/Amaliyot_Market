const { Router } = require("express");
const { fileRead, fileWrite } = require("../fs/fileUtil");
const router = Router();
const AuthMiddleware = require("../middleware/auth.js");

router.get("/products", AuthMiddleware, (req, res) => {
	let products = fileRead("products");
	products.forEach((i) => delete i.branchId);
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(products));
});

router.get("/products/:id", AuthMiddleware, (req, res) => {
	let products = fileRead("products").find((i) => i.id == req.params.id) || [];
	res.header("Content-Type", "text/json");
	res.end(JSON.stringify(products));
});

router.post("/products", AuthMiddleware, (req, res) => {
	let products = fileRead("products");
	products.push({
		id: products[products.length - 1].id + 1,
		...req.body,
	});
	fileWrite("products", products);
	res.end("Created successfully");
});

router.put("/products/:id", AuthMiddleware, (req, res) => {
	let products = fileRead("products");
	for (let i = 0; i < products.length; i++) {
		if (products[i].id == req.params.id) {
			products[i] = { ...products[i], ...req.body };
		}
	}
	fileWrite("products", products);
	res.end("Updated successfully");
});

router.delete("/products/:id", AuthMiddleware, (req, res) => {
	let products = fileRead("products");
	for (let i = 0; i < products.length; i++) {
		if (products[i].id == req.params.id) {
			products.splice(i, 1);
		}
	}
	fileWrite("products", products);
	res.end("Deleted successfully");
});

module.exports = router;
