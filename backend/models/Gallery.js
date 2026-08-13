const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  titleFr: { type: String, default: '' },
  descriptionFr: { type: String, default: '' },
  image: { type: String, required: true },
  imagePublicId: { type: String, default: '' },
  category: {
    type: String,
    enum: ['facility', 'programs', 'events', 'team', 'general'],
    default: 'general'
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  titleFr: { type: String, default: '' },
  descriptionFr: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
