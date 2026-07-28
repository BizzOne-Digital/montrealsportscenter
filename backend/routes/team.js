const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const data = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const data = await TeamMember.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, (req, res, next) => { req.uploadFolder = 'team'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.image = req.file.path; data.imagePublicId = req.file.filename; }
    if (typeof data.socialLinks === 'string') data.socialLinks = JSON.parse(data.socialLinks);
    const item = await TeamMember.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, (req, res, next) => { req.uploadFolder = 'team'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await TeamMember.findById(req.params.id);
      if (existing?.imagePublicId) await cloudinary.uploader.destroy(existing.imagePublicId);
      data.image = req.file.path; data.imagePublicId = req.file.filename;
    }
    if (typeof data.socialLinks === 'string') data.socialLinks = JSON.parse(data.socialLinks);
    const item = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await TeamMember.findById(req.params.id);
    if (item?.imagePublicId) await cloudinary.uploader.destroy(item.imagePublicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
