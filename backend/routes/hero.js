const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne({ isActive: true });
    if (!hero) {
      hero = await Hero.create({
        stats: [
          { value: '10,000+', label: 'sq. ft. court-focused concept' },
          { value: '5–18', label: 'youth academy age focus' },
          { value: '7 days', label: 'programming for the community' }
        ]
      });
    }
    res.json({ success: true, data: hero });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/', protect, (req, res, next) => { req.uploadFolder = 'hero'; next(); }, upload.single('backgroundImage'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Hero.findOne();
      if (existing?.backgroundImage) {
        const pubId = existing.backgroundImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`msc/hero/${pubId}`).catch(() => {});
      }
      data.backgroundImage = req.file.path;
    }
    if (typeof data.stats === 'string') data.stats = JSON.parse(data.stats);
    if (typeof data.mission === 'string') data.mission = JSON.parse(data.mission);
    let hero = await Hero.findOne();
    if (hero) { hero = await Hero.findByIdAndUpdate(hero._id, data, { new: true }); }
    else { hero = await Hero.create(data); }
    res.json({ success: true, data: hero });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
