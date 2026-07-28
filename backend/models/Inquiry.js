const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  interest: {
    type: String,
    enum: ['court-rental', 'youth-academy', 'camps-clinics', 'leagues', 'birthday-event', 'membership', 'partnership', 'other'],
    default: 'other'
  },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'closed'],
    default: 'new'
  },
  adminNotes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
