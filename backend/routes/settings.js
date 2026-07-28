const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    res.json({ success: true, data: settings });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/', protect, (req, res, next) => { req.uploadFolder = 'settings'; next(); }, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (typeof data.socialLinks === 'string') data.socialLinks = JSON.parse(data.socialLinks);
    if (typeof data.seo === 'string') data.seo = JSON.parse(data.seo);
    if (typeof data.announcement === 'string') data.announcement = JSON.parse(data.announcement);
    if (typeof data.operatingHours === 'string') data.operatingHours = JSON.parse(data.operatingHours);

    const existing = await SiteSettings.findOne();
    if (req.files?.logo) {
      if (existing?.logoPublicId) await cloudinary.uploader.destroy(existing.logoPublicId).catch(() => {});
      data.logo = req.files.logo[0].path;
      data.logoPublicId = req.files.logo[0].filename;
    }
    if (req.files?.favicon) {
      data.favicon = req.files.favicon[0].path;
    }

    let settings;
    if (existing) { settings = await SiteSettings.findByIdAndUpdate(existing._id, data, { new: true }); }
    else { settings = await SiteSettings.create(data); }
    res.json({ success: true, data: settings });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
