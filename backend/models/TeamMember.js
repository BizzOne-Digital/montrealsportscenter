const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, default: '' },
  roleFr: { type: String, default: '' },
  bioFr: { type: String, default: '' },
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  roleFr: { type: String, default: '' },
  bioFr: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
