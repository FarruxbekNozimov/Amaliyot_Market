"use strict";

var express = require("express");

var app = express();
var PORT = 1234;

var AuthMiddleware = require("./middleware/auth.js");

app.use(express.json());
app.use(AuthMiddleware); // Routes

var AuthRoute = require("./routes/auth.js");

var MarketRoute = require("./routes/market.js");

app.use(AuthRoute);
app.use(MarketRoute);
app.listen(PORT, function () {
  return console.log("Server is running on port", PORT);
});