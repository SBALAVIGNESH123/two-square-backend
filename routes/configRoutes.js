const express = require('express');
const router = express.Router();
const Config = require('../models/Config');

// Get config for a branch
router.get('/:branch', async (req, res) => {
  try {
    let config = await Config.findOne({ branch: req.params.branch });
    if (!config) {
      // Create default if none exists
      config = new Config({
        branch: req.params.branch,
        businessDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update config (e.g. advance business date)
router.put('/:branch', async (req, res) => {
  try {
    const config = await Config.findOneAndUpdate(
      { branch: req.params.branch },
      req.body,
      { new: true, upsert: true }
    );
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
