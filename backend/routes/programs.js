const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { cloudinary } = require('../config/cloudinary');

// GET /api/programs - public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    const programs = await Program.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: programs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/programs/admin - protected, all
router.get('/admin', protect, async (req, res) => {
  try {
    const programs = await Program.find().sort({ order: 1 });
    res.json({ success: true, data: programs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/programs/:id
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
    res.json({ success: true, data: program });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/programs - protected
router.post('/', protect, (req, res, next) => { req.uploadFolder = 'programs'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    if (typeof data.features === 'string') data.features = JSON.parse(data.features);
    const program = await Program.create(data);
    res.status(201).json({ success: true, data: program });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/programs/:id - protected
router.put('/:id', protect, (req, res, next) => { req.uploadFolder = 'programs'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Program.findById(req.params.id);
      if (existing?.imagePublicId) await cloudinary.uploader.destroy(existing.imagePublicId);
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    if (typeof data.features === 'string') data.features = JSON.parse(data.features);
    const program = await Program.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: program });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/programs/:id - protected
router.delete('/:id', protect, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ success: false, message: 'Not found' });
    if (program.imagePublicId) await cloudinary.uploader.destroy(program.imagePublicId);
    await program.deleteOne();
    res.json({ success: true, message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
