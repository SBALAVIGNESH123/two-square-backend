const mongoose = require('mongoose');

const shiftLogSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  date: { type: String, required: true },
  reportedBy: { type: String, default: '' },
  closingBalance: { type: Number, default: 0 },
  collection: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('ShiftLog', shiftLogSchema);
