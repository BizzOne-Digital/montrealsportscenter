const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tier: { type: String, enum: ['bronze', 'silver', 'gold'], required: true },
  badge: { type: String, default: 'Starter' },
  price: { type: Number, required: true },
  period: { type: String, default: 'month' },
  description: { type: String },
  features: [{ type: String }],
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  ctaText: { type: String, default: 'Request Info' },
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
