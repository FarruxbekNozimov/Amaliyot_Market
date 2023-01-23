const { fileRead } = require("../fs/fileUtil");
const jwt = require("jsonwebtoken");
const { generateJWTtoken } = require("../utils/token");

let AuthMiddleware = function (req, res, next) {
	let users = fileRead("users");
	let userId = jwt.verify(req.headers.token, "FarruxDEV");
	for (let i in users) if (userId.userId == users[i].id) return next();
	res.end("User not found");
};

module.exports = AuthMiddleware;
