const { fileRead } = require("../fs/fileUtil");
const { generateJWTtoken, parseJwt } = require("../utils/token");

let AuthMiddleware = function (req, res, next) {
	let users = fileRead("users");
	console.log("jwt", parseJwt(req.headers.token));
	for (let i in users) {
	}
	res.end(req.headers.token);
};

module.exports = AuthMiddleware;
