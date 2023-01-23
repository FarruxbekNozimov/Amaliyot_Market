const { Router } = require("express");
const { fileRead } = require("../fs/fileUtil");
const { generateJWTtoken } = require("../utils/token");
const router = Router();

router.post("/login", (req, res) => {
	let { username, password } = req.body;
	let users = fileRead("users");
	console.log("salom");
	for (let i in users) {
		if (users[i].username == username && users[i].password == password) {
			let token = generateJWTtoken(users.id);
			res.end(token);
		}
	}
});

module.exports = router;
