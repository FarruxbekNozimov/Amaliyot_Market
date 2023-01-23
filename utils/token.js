const jwt = require("jsonwebtoken");
const KEY = "FarruxDEV";

const generateJWTtoken = (userId) => {
	console.log(userId, "Funksiyada");
	const accessToken = jwt.sign({ userId: userId }, KEY, {
		expiresIn: "1h",
	});
	return accessToken;
};

module.exports = { generateJWTtoken };
