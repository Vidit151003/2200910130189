const Url = require("../models/url");
const generateShortcode = require("../utils/generateShortcode");

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    let code = shortcode || generateShortcode();
    const expiryDate = new Date(Date.now() + validity * 60000);

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: code,
      expiry: expiryDate
    });

    return res.status(201).json({
      shortLink: `${process.env.BASE_URL}/shorturls/${code}`,
      expiry: expiryDate.toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const urlDoc = await Url.findOne({ shortCode: code });

    if (!urlDoc) return res.status(404).json({ error: "URL not found" });
    if (new Date() > urlDoc.expiry) return res.status(410).json({ error: "Link expired" });

    urlDoc.clicks += 1;
    urlDoc.logs.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "Direct",
      location: req.ip
    });
    await urlDoc.save();

    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { code } = req.params;
    const urlDoc = await Url.findOne({ shortCode: code });

    if (!urlDoc) return res.status(404).json({ error: "URL not found" });

    return res.json({
      originalUrl: urlDoc.originalUrl,
      expiry: urlDoc.expiry,
      clicks: urlDoc.clicks,
      logs: urlDoc.logs
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
