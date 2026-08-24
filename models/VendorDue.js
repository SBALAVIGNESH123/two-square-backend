const mongoose = require('mongoose');

const vendorDueSchema = new mongoose.Schema({
  id: { type: String, required: true },
  branch: { type: String, required: true },
  vendorName: { type: String, required: true },
  description: { type: String },
  totalBill: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  pendingAmount: { type: Number, required: true },
  date: { type: String, required: true },
  cleared: { type: Boolean, default: false },
  clearedDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('VendorDue', vendorDueSchema);
