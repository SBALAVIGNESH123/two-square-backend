const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  category: { type: String },
  quantity: { type: Number },
  price: { type: Number }
}, { strict: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  branch: { type: String, required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  paymentMethod: { type: String, default: 'Cash' },
  customerName: { type: String, default: '' },
  customerPhone: { type: String, default: '' },
  pendingAmount: { type: Number, default: 0 },
  initialPendingAmount: { type: Number, default: 0 },
  pendingCleared: { type: Boolean, default: false },
  pendingClearedDate: { type: String },
  status: { type: String, default: 'Completed' },
  date: { type: String, required: true },
  timestamp: { type: String, default: '' },
  shiftClosed: { type: Boolean, default: false }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Order', orderSchema);
