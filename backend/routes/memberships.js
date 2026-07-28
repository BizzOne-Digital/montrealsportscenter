const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: memberships });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ order: 1 });
    res.json({ success: true, data: memberships });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    if (typeof req.body.features === 'string') req.body.features = JSON.parse(req.body.features);
    const item = await Membership.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    if (typeof req.body.features === 'string') req.body.features = JSON.parse(req.body.features);
    const item = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Membership.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
