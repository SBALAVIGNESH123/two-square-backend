const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  branch: { type: String, required: true },
  category: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    lowStockThreshold: { type: Number, default: 10 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
