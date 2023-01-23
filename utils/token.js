const jwt = require("jsonwebtoken");
const KEY = "FarruxDEV";

const generateJWTtoken = (userId) => {
	console.log(userId);
	const accessToken = jwt.sign({ userId }, KEY, {
		expiresIn: "1h",
	});
	return accessToken;
};
function parseJwt(token) {
	console.log("parse", token);
	// return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

module.exports = { generateJWTtoken, parseJwt };
