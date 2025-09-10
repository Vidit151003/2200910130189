const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(
  path.join(__dirname, "logs.txt"),
  { flags: "a" }
);

const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.url}`;
  logStream.write(log + "\n");
  console.log(log);
  next();
};

module.exports = logger;
