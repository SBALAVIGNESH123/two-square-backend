const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  branch: { type: String, required: true, unique: true },
  businessDate: { type: String, required: true },
  // We can add other config fields here like shop open time, etc.
}, { timestamps: true });

module.exports = mongoose.model('Config', configSchema);
