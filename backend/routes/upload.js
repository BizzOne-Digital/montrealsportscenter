const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

// Single image upload
router.post('/', protect, (req, res, next) => {
  req.uploadFolder = req.query.folder || 'general';
  next();
}, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  res.json({
    success: true,
    url: req.file.path,
    publicId: req.file.filename,
  });
});

// Delete image from Cloudinary
router.delete('/', protect, async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ success: false, message: 'publicId required' });
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
