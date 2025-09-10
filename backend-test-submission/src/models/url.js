const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  expiry: { type: Date, required: true },
  clicks: { type: Number, default: 0 },
  logs: [
    {
      timestamp: Date,
      referrer: String,
      location: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Url", urlSchema);
