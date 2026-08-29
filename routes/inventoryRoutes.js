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

// Save/Update full inventory for a branch (PUT /)
router.put('/', async (req, res) => {
  try {
    const { branch, items } = req.body;
    if (!branch || !items) return res.status(400).json({ message: 'Branch and items are required' });
    
    // Clear old inventory
    await Inventory.deleteMany({ branch });
    
    // Insert new
    const docsToInsert = Object.keys(items).map(category => ({
      branch,
      category,
      items: items[category]
    }));
    
    await Inventory.insertMany(docsToInsert);
    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save/Update full inventory for a branch (PUT /:branch)
router.put('/:branch', async (req, res) => {
  try {
    const { branch } = req.params;
    const invData = req.body;
    
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
