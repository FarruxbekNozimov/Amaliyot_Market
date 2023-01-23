"use strict";

var fs = require("fs");

var path = require("path");

var fileRead = function fileRead(fileName) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "model", fileName + ".json"), "utf-8"));
};

var fileWrite = function fileWrite(fileName, data) {
  return fs.writeFileSync("./model/" + fileName + ".json", JSON.stringify(data, null, 2));
};

module.exports = {
  fileRead: fileRead,
  fileWrite: fileWrite
};