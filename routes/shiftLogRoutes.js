const express = require('express');
const router = express.Router();
const ShiftLog = require('../models/ShiftLog');

// Get all shift logs for a branch
router.get('/:branch', async (req, res) => {
  try {
    const logs = await ShiftLog.find({ branch: req.params.branch });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update a shift log
router.post('/', async (req, res) => {
  try {
    const { branch, date } = req.body;
    // Upsert: update if exists for this branch+date, create if not
    const log = await ShiftLog.findOneAndUpdate(
      { branch, date },
      req.body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Wipe all shift logs for a branch
router.delete('/:branch/wipe-all', async (req, res) => {
  try {
    await ShiftLog.deleteMany({ branch: req.params.branch });
    res.json({ message: 'All shift logs wiped' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
