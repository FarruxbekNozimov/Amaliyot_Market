const fs = require("fs");
const path = require("path");

let fileRead = (fileName) => {
	return JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "..", "model", fileName + ".json"),
			"utf-8"
		)
	);
};

let fileWrite = (fileName, data) => {
	return fs.writeFileSync(
		"./model/" + fileName + ".json",
		JSON.stringify(data, null, 2)
	);
};

module.exports = {
	fileRead,
	fileWrite,
};
