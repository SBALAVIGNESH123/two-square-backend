const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  category: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  }]
}, { timestamps: true });

// A document will represent a category for a specific branch
module.exports = mongoose.model('Menu', menuSchema);
