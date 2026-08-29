const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders for a branch
router.get('/:branch', async (req, res) => {
  try {
    const orders = await Order.find({ branch: req.params.branch });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get today's orders for a branch (ALL orders, not just open shift)
router.get('/:branch/today', async (req, res) => {
  try {
    const { date } = req.query; // pass current business date
    const orders = await Order.find({ 
      branch: req.params.branch,
      date: date
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    ...req.body,
    initialPendingAmount: req.body.pendingAmount || 0
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel an order
router.put('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status: 'Cancelled' },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Pay pending amount
router.put('/:id/pay', async (req, res) => {
  try {
    const { amountPaid, date } = req.body;
    const order = await Order.findOne({ orderId: req.params.id });
    
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    if (amountPaid >= order.pendingAmount) {
      order.pendingAmount = 0;
      order.pendingCleared = true;
      order.pendingClearedDate = date;
    } else {
      order.pendingAmount -= amountPaid;
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
