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
	console.log(data);
	return fs.writeFileSync(
		"./model/" + fileName + ".json",
		JSON.stringify(data, null, 4)
	);
};

module.exports = {
	fileRead,
	fileWrite,
};
