const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  courtName: { type: String, required: true },
  offPeakPrice: { type: Number, required: true },
  peakPrice: { type: Number, required: true },
  unit: { type: String, default: 'hour' },
  courtNameFr: { type: String, default: '' },
  unitFr: { type: String, default: '' },
  icon: { type: String, default: 'court' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  courtNameFr: { type: String, default: '' },
  unitFr: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
