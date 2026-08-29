const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  branch: { type: String, required: true },
  type: { type: String, default: '' },
  desc: { type: String, default: '' },
  amount: { type: Number, default: 0 },
  date: { type: String, required: true },
  time: { type: String, default: '' },
  shiftClosed: { type: Boolean, default: false },
  status: { type: String, default: 'active' }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Expense', expenseSchema);
