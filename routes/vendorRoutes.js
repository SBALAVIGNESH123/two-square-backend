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

// Get all vendor dues for a branch
router.get('/:branch', async (req, res) => {
  try {
    const dues = await VendorDue.find({ branch: req.params.branch });
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
    
    due.amountPaid = (due.amountPaid || 0) + amountPaid;
    if (due.amountPaid >= due.totalBill) {
      due.pendingAmount = 0;
      due.cleared = true;
      due.clearedDate = date;
    } else {
      due.pendingAmount = due.totalBill - due.amountPaid;
    }
    
    const updatedDue = await due.save();
    res.json(updatedDue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all vendor dues for a branch (used for wipe data)
router.delete('/:branch/all', async (req, res) => {
  try {
    await VendorDue.deleteMany({ branch: req.params.branch });
    res.json({ message: 'All vendor dues cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Wipe all vendor dues for a branch
router.delete('/:branch/wipe-all', async (req, res) => {
  try {
    await VendorDue.deleteMany({ branch: req.params.branch });
    res.json({ message: 'All vendor dues wiped' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
