const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  courtName: { type: String, required: true },
  offPeakPrice: { type: Number, required: true },
  peakPrice: { type: Number, required: true },
  unit: { type: String, default: 'hour' },
  icon: { type: String, default: 'court' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
