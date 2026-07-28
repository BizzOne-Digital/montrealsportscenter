const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    const data = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const data = await Gallery.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, (req, res, next) => { req.uploadFolder = 'gallery'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.image = req.file.path; data.imagePublicId = req.file.filename; }
    const item = await Gallery.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, (req, res, next) => { req.uploadFolder = 'gallery'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Gallery.findById(req.params.id);
      if (existing?.imagePublicId) await cloudinary.uploader.destroy(existing.imagePublicId);
      data.image = req.file.path; data.imagePublicId = req.file.filename;
    }
    const item = await Gallery.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (item?.imagePublicId) await cloudinary.uploader.destroy(item.imagePublicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
