const express = require('express');
const router = express.Router();
const VendorDue = require('../models/VendorDue');

// Get all uncleared vendor dues
router.get('/:branch/uncleared', async (req, res) => {
  try {
    const dues = await VendorDue.find({ 
      branch: req.params.branch,
      cleared: false 
    });
    res.json(dues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new vendor due
router.post('/', async (req, res) => {
  const due = new VendorDue(req.body);
  try {
    const newDue = await due.save();
    res.status(201).json(newDue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Pay partial vendor due
router.put('/:id/pay', async (req, res) => {
  try {
    const { amountPaid, date } = req.body;
    const due = await VendorDue.findOne({ id: req.params.id });
    
    if (!due) return res.status(404).json({ message: 'Vendor due not found' });
    
    if (amountPaid >= due.pendingAmount) {
      due.pendingAmount = 0;
      due.cleared = true;
      due.clearedDate = date;
    } else {
      due.pendingAmount -= amountPaid;
    }
    
    const updatedDue = await due.save();
    res.json(updatedDue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
