"use strict";

var express = require("express");

var app = express();
var PORT = 1234;

var AuthMiddleware = require("./middleware/auth.js");

app.use(express.json()); // Routes

var AuthRoute = require("./routes/auth.js");

var MarketRoute = require("./routes/market.js");

var BranchesRoute = require("./routes/branches.js");

var WorkersRoute = require("./routes/worker.js");

var ProductsRoute = require("./routes/products.js");

app.use(express.json());
app.use(AuthRoute); // Middleware

app.use(MarketRoute);
app.use(AuthMiddleware);
app.use(BranchesRoute);
app.use(WorkersRoute);
app.use(ProductsRoute);
app.listen(PORT, function () {
  return console.log("Server is running on port", PORT);
});