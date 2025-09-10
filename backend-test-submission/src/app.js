const express = require("express");
const logger = require('../../logging-middleware/logger'); // middleware at project root
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(express.json());
app.use(logger);

// 👇 THIS IS CRUCIAL
app.use("/api/url", urlRoutes);

module.exports = app;
