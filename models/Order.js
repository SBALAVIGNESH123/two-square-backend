const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  branch: { type: String, required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true, enum: ['Cash', 'UPI', 'Customer Pending'] },
  customerName: { type: String }, // For pending orders
  customerPhone: { type: String },
  status: { type: String, default: 'Completed', enum: ['Completed', 'Pending'] },
  date: { type: String, required: true },
  timestamp: { type: String, required: true },
  shiftClosed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
