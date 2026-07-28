const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, avatar: admin.avatar }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findByIdAndUpdate(req.admin._id, { name, email }, { new: true }).select('-password');
    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);
    if (!(await admin.matchPassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }
    admin.password = newPassword;
    await admin.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
