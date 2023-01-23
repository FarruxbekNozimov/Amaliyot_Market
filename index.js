const express = require("express");
const app = express();
const PORT = 1234;

const AuthMiddleware = require("./middleware/auth.js");
app.use(express.json());
app.use(AuthMiddleware);

// Routes
const AuthRoute = require("./routes/auth.js");
const MarketRoute = require("./routes/market.js");

app.use(AuthRoute);
app.use(MarketRoute);

app.listen(PORT, () => console.log("Server is running on port", PORT));
