const express = require("express");
const cors = require("cors");
const logger = require("../../logging-middleware/logger");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);  // Mandatory Logging Middleware

app.use("/shorturls", urlRoutes);

module.exports = app;
