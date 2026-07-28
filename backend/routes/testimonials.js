const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const data = await Testimonial.find({ isActive: true }).sort({ isFeatured: -1, order: 1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, (req, res, next) => { req.uploadFolder = 'testimonials'; next(); }, upload.single('avatar'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.avatar = req.file.path; data.avatarPublicId = req.file.filename; }
    const item = await Testimonial.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, (req, res, next) => { req.uploadFolder = 'testimonials'; next(); }, upload.single('avatar'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Testimonial.findById(req.params.id);
      if (existing?.avatarPublicId) await cloudinary.uploader.destroy(existing.avatarPublicId);
      data.avatar = req.file.path; data.avatarPublicId = req.file.filename;
    }
    const item = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (item?.avatarPublicId) await cloudinary.uploader.destroy(item.avatarPublicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
