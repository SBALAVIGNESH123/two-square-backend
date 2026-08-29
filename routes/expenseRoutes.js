const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get today's expenses for a branch (ALL expenses for the date)
router.get('/:branch/today', async (req, res) => {
  try {
    const { date } = req.query; 
    const expenses = await Expense.find({ 
      branch: req.params.branch,
      date: date
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all expenses for a branch
router.get('/:branch', async (req, res) => {
  try {
    const expenses = await Expense.find({ branch: req.params.branch });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:branch/all', async (req, res) => {
  try {
    const expenses = await Expense.find({ branch: req.params.branch });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  const expense = new Expense(req.body);
  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete (cancel) an expense
router.delete('/:id', async (req, res) => {
  try {
    // using findOneAndUpdate to just mark it as cancelled instead of hard deleting
    const idParam = req.params.id;
    const expense = await Expense.findOneAndUpdate(
      { $or: [{ id: idParam }, { id: Number(idParam) }] }, 
      { status: 'cancelled' },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Close shift for an expense
router.put('/:id/close-shift', async (req, res) => {
  try {
    const idParam = req.params.id;
    const expense = await Expense.findOneAndUpdate(
      { $or: [{ id: idParam }, { id: Number(idParam) }] },
      { shiftClosed: true },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Wipe all expenses for a branch
router.delete('/:branch/wipe-all', async (req, res) => {
  try {
    await Expense.deleteMany({ branch: req.params.branch });
    res.json({ message: 'All expenses wiped' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
