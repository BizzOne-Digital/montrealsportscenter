const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    const total = await Blog.countDocuments(filter);
    const data = await Blog.find(filter).sort({ publishedAt: -1 }).skip((page - 1) * limit).limit(Number(limit)).select('-content');
    res.json({ success: true, data, total, pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const data = await Blog.find().sort({ createdAt: -1 }).select('-content');
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOneAndUpdate({ slug: req.params.slug, isPublished: true }, { $inc: { views: 1 } }, { new: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, (req, res, next) => { req.uploadFolder = 'blog'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.image = req.file.path; data.imagePublicId = req.file.filename; }
    if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
    const item = await Blog.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, (req, res, next) => { req.uploadFolder = 'blog'; next(); }, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Blog.findById(req.params.id);
      if (existing?.imagePublicId) await cloudinary.uploader.destroy(existing.imagePublicId);
      data.image = req.file.path; data.imagePublicId = req.file.filename;
    }
    if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
    const item = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Blog.findById(req.params.id);
    if (item?.imagePublicId) await cloudinary.uploader.destroy(item.imagePublicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
