const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get inventory for a branch
router.get('/:branch', async (req, res) => {
  try {
    const invDocs = await Inventory.find({ branch: req.params.branch });
    
    // Transform into frontend format { category: [items] }
    const formattedInv = {};
    invDocs.forEach(doc => {
      formattedInv[doc.category] = doc.items;
    });
    
    res.json(formattedInv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save/Update full inventory for a branch
router.post('/:branch', async (req, res) => {
  try {
    const { branch } = req.params;
    const invData = req.body; // expected format: { category: [items] }
    
    // Clear old inventory
    await Inventory.deleteMany({ branch });
    
    // Insert new
    const docsToInsert = Object.keys(invData).map(category => ({
      branch,
      category,
      items: invData[category]
    }));
    
    await Inventory.insertMany(docsToInsert);
    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
