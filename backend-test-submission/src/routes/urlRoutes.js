const express = require("express");
const { createShortUrl, redirectUrl, getStats } = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:code", redirectUrl);
router.get("/:code/stats", getStats);

module.exports = router;
