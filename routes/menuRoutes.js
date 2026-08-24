const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get menu for a branch
router.get('/:branch', async (req, res) => {
  try {
    const menuDocs = await Menu.find({ branch: req.params.branch });
    
    // Transform into frontend format { category: [items] }
    const formattedMenu = {};
    menuDocs.forEach(doc => {
      formattedMenu[doc.category] = doc.items;
    });
    
    res.json(formattedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save/Update full menu for a branch
router.post('/:branch', async (req, res) => {
  try {
    const { branch } = req.params;
    const menuData = req.body; // expected format: { category: [items] }
    
    // Clear old menu
    await Menu.deleteMany({ branch });
    
    // Insert new
    const docsToInsert = Object.keys(menuData).map(category => ({
      branch,
      category,
      items: menuData[category]
    }));
    
    await Menu.insertMany(docsToInsert);
    res.status(200).json({ message: 'Menu updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
