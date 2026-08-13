const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  badge: { type: String, default: 'Year-round indoor basketball center' },
  headline: { type: String, default: 'Train. Play. Compete. Belong.' },
  subheadline: { type: String, default: 'Montreal Sports Center is being built as a safe, professionally managed indoor sports hub for youth, families, schools, teams, coaches, and community organizations across the West Island.' },
  primaryBtnText: { type: String, default: 'Book / Inquire' },
  primaryBtnLink: { type: String, default: '#contact' },
  secondaryBtnText: { type: String, default: 'Explore Programs' },
  secondaryBtnLink: { type: String, default: '#programs' },
  stats: [
    {
      value: { type: String },
      label: { type: String },
      labelFr: { type: String, default: '' }
    }
  ],
  mission: {
    title: { type: String, default: 'MSC MISSION' },
    text: { type: String, default: 'Build better players, stronger families, and a connected community.' },
    titleFr: { type: String, default: '' },
    textFr: { type: String, default: '' }
  },
  backgroundImage: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  badgeFr: { type: String, default: '' },
  headlineFr: { type: String, default: '' },
  subheadlineFr: { type: String, default: '' },
  primaryBtnTextFr: { type: String, default: '' },
  secondaryBtnTextFr: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
