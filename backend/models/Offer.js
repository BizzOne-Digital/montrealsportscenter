const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, default: '' },
  validUntil: { type: Date },
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  badgeText: { type: String, default: 'Limited Offer' },
  badgeColor: { type: String, default: 'orange' },
  ctaText: { type: String, default: 'Claim Offer' },
  ctaLink: { type: String, default: '#contact' },
  terms: { type: String, default: '' },
  titleFr: { type: String, default: '' },
  descriptionFr: { type: String, default: '' },
  discountFr: { type: String, default: '' },
  badgeTextFr: { type: String, default: '' },
  ctaTextFr: { type: String, default: '' },
  termsFr: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  titleFr: { type: String, default: '' },
  descriptionFr: { type: String, default: '' },
  discountFr: { type: String, default: '' },
  badgeTextFr: { type: String, default: '' },
  ctaTextFr: { type: String, default: '' },
  termsFr: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
