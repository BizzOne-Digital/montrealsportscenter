// Central route registrar
const authRoutes = require('./auth');
const programRoutes = require('./programs');
const membershipRoutes = require('./memberships');
const pricingRoutes = require('./pricing');
const inquiryRoutes = require('./inquiries');
const galleryRoutes = require('./gallery');
const testimonialRoutes = require('./testimonials');
const teamRoutes = require('./team');
const blogRoutes = require('./blog');
const offerRoutes = require('./offers');
const settingsRoutes = require('./settings');
const heroRoutes = require('./hero');
const uploadRoutes = require('./upload');

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/programs', programRoutes);
  app.use('/api/memberships', membershipRoutes);
  app.use('/api/pricing', pricingRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/team', teamRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/offers', offerRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/hero', heroRoutes);
  app.use('/api/upload', uploadRoutes);
};
