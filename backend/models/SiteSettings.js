const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Montreal Sports Center' },
  tagline: { type: String, default: 'The Home of Basketball in the West Island' },
  logo: { type: String, default: '' },
  logoPublicId: { type: String, default: '' },
  favicon: { type: String, default: '' },
  email: { type: String, default: 'info@montrealsportscenter.ca' },
  phone: { type: String, default: '514-791-0738' },
  address: { type: String, default: 'West Island / Pointe-Claire, Quebec' },
  area: { type: String, default: 'Serving Pointe-Claire, DDO, Pierrefonds, Kirkland, Beaconsfield, Dorval and nearby areas' },
  socialLinks: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  seo: {
    metaTitle: { type: String, default: 'Montreal Sports Center - Train. Play. Compete. Belong.' },
    metaDescription: { type: String, default: 'A basketball-first indoor sports hub for youth, families, teams, schools, and the West Island community.' },
    keywords: { type: String, default: 'basketball, sports center, Montreal, West Island, youth academy, court rental' },
    metaTitleFr: { type: String, default: '' },
    metaDescriptionFr: { type: String, default: '' },
  },
  announcement: {
    text: { type: String, default: 'Coming soon to the West Island of Montreal' },
    isActive: { type: Boolean, default: true },
    textFr: { type: String, default: '' },
  },
  operatingHours: [
    {
      day: { type: String },
      dayFr: { type: String, default: '' },
      open: { type: String },
      close: { type: String },
      isClosed: { type: Boolean, default: false }
    }
  ],
  isMaintenanceMode: { type: Boolean, default: false },
  taglineFr: { type: String, default: '' },
  addressFr: { type: String, default: '' },
  areaFr: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
