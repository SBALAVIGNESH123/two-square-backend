const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  branch: { type: String, required: true, unique: true },
  businessDate: { type: String, required: true },
  // We can add other config fields here like shop open time, etc.
  // Admin login password (SHA-256 hash, hex). Empty = never changed,
  // frontend falls back to the built-in default.
  adminPasswordHash: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Config', configSchema);
