const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  category: {
    type: String,
    enum: ['news', 'programs', 'events', 'community', 'tips'],
    default: 'news'
  },
  tags: [{ type: String }],
  author: { type: String, default: 'MSC Team' },
  titleFr: { type: String, default: '' },
  excerptFr: { type: String, default: '' },
  contentFr: { type: String, default: '' },
  tagsFr: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
  titleFr: { type: String, default: '' },
  excerptFr: { type: String, default: '' },
  contentFr: { type: String, default: '' },
  tagsFr: [{ type: String, default: '' }],
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
