const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Member' },
  avatar: { type: String, default: '' },
  avatarPublicId: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  text: { type: String, required: true },
  program: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
