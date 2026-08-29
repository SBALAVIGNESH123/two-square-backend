const mongoose = require('mongoose');

const vendorDueSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  branch: { type: String, required: true },
  vendorName: { type: String, default: '' },
  description: { type: String, default: '' },
  totalBill: { type: Number, default: 0 },
  amountPaid: { type: Number, default: 0 },
  pendingAmount: { type: Number, default: 0 },
  date: { type: String, default: '' },
  cleared: { type: Boolean, default: false },
  clearedDate: { type: String }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('VendorDue', vendorDueSchema);
