const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/auth');
const { sendNotification } = require('../config/email');

// Public - submit inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: inquiry });

    sendNotification({
      subject: `New Inquiry from ${inquiry.fullName || 'Website'}`,
      html: `
        <h3>New inquiry received</h3>
        <p><strong>Name:</strong> ${inquiry.fullName || '-'}</p>
        <p><strong>Email:</strong> ${inquiry.email || '-'}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || '-'}</p>
        <p><strong>Interest:</strong> ${inquiry.interest || '-'}</p>
        <p><strong>Message:</strong> ${inquiry.message || '-'}</p>
      `,
    }).then(() => console.log('Inquiry notification email sent to', process.env.NOTIFY_EMAIL || process.env.EMAIL_USER))
      .catch((err) => console.error('Email notification failed:', err.message));
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

// Protected - get all
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const total = await Inquiry.countDocuments(filter);
    const data = await Inquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Protected - update status
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
