const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  titleFr: { type: String, default: '' },
  descriptionFr: { type: String, default: '' },
  featuresFr: [{ type: String }],
  titleFr: { type: String, default: '' },
  descriptionFr: { type: String, default: '' },
  featuresFr: [{ type: String, default: '' }],
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  icon: { type: String, default: 'basketball' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  category: {
    type: String,
    enum: ['rental', 'academy', 'league', 'camp', 'event', 'partnership'],
    default: 'rental'
  },
  slug: { type: String, unique: true },
}, { timestamps: true });

programSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Program', programSchema);
