const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Local log file stream
const logStream = fs.createWriteStream(
  path.join(__dirname, "logs.txt"),
  { flags: "a" }
);

// Function to send logs to API
const sendLogToAPI = async ({ stack, level, packageName, message }) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack: stack.toLowerCase(),       // "backend" | "frontend"
        level: level.toLowerCase(),       // "info" | "error" | etc.
        package: packageName.toLowerCase(), // e.g. "handler", "api"
        message,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("✅ Log sent to API:", response.data);
  } catch (error) {
    console.error("❌ Failed to send log:", error.message);
  }
};

// Express middleware logger
const logger = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} ${req.method} ${req.url}`;

  // 1. Write to local file
  logStream.write(logMessage + "\n");

  // 2. Print to console
  console.log(logMessage);

  // 3. Send to API
  sendLogToAPI({
    stack: "backend",             // or "frontend" depending on your app
    level: "info",                // choose log level (info/debug/warn/error/fatal)
    packageName: "handler",       // package based on docs
    message: logMessage,
  });

  next();
};

module.exports = logger;
