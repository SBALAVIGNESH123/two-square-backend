const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  branch: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  shiftClosed: { type: Boolean, default: false },
  status: { type: String, default: 'active', enum: ['active', 'cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
