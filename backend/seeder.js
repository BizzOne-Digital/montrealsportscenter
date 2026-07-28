require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Membership = require('./models/Membership');
const Pricing = require('./models/Pricing');
const Program = require('./models/Program');
const Testimonial = require('./models/Testimonial');
const Offer = require('./models/Offer');
const SiteSettings = require('./models/SiteSettings');
const Hero = require('./models/Hero');

connectDB();

const seed = async () => {
  try {
    // Clear existing
    await Promise.all([
      Admin.deleteMany(), Membership.deleteMany(), Pricing.deleteMany(),
      Program.deleteMany(), Testimonial.deleteMany(), Offer.deleteMany(),
      SiteSettings.deleteMany(), Hero.deleteMany()
    ]);

    // Admin
    await Admin.create({ name: 'MSC Admin', email: process.env.ADMIN_EMAIL || 'admin@montrealsportscenter.ca', password: process.env.ADMIN_PASSWORD || 'Admin@MSC2026', role: 'admin' });

    // Hero
    await Hero.create({
      badge: 'Year-round indoor basketball center',
      headline: 'Train. Play.\nCompete. Belong.',
      subheadline: 'Montreal Sports Center is a safe, professionally managed indoor sports hub for youth, families, schools, teams, coaches, and community organizations across the West Island.',
      primaryBtnText: 'Book / Inquire',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Explore Programs',
      secondaryBtnLink: '/programs',
      stats: [
        { value: '10,000+', label: 'sq. ft. court-focused facility' },
        { value: '5–18', label: 'youth academy age focus' },
        { value: '7 Days', label: 'programming for the community' }
      ],
      mission: { title: 'MSC MISSION', text: 'Build better players, stronger families, and a connected community.' },
    });

    // Programs (created one-by-one so the pre('save') slug hook runs — insertMany skips it)
    const programsData = [
      { title: 'Court Rentals', description: 'Reserve indoor court time for teams, coaches, friends, leagues, practices, and private runs.', features: ['Half-court and full-court options', 'Team practices and scrimmages', 'Coach-led sessions'], category: 'rental', icon: 'court', order: 1 },
      { title: 'Youth Basketball Academy', description: 'Skill-building programs designed to develop confidence, discipline, teamwork, and basketball IQ.', features: ['Beginner to advanced groups', 'After-school development', 'Shooting, ball handling, decision-making'], category: 'academy', icon: 'academy', order: 2 },
      { title: 'Leagues & Tournaments', description: 'Organized competition for youth, adults, schools, clubs, and local community groups.', features: ['3v3 and 5v5 formats', 'Seasonal tournaments', 'Adult recreational nights'], category: 'league', icon: 'trophy', order: 3 },
      { title: 'Camps & Clinics', description: 'School-break, summer, and weekend programs that keep kids active, learning, and engaged.', features: ['Full-week camps', 'Specialized clinics', 'Fun games and competitions'], category: 'camp', icon: 'camp', order: 4 },
      { title: 'Birthdays & Events', description: 'Host active birthday parties, family events, team celebrations, and community gatherings.', features: ['Private court time', 'Games and activities', 'Simple event packages'], category: 'event', icon: 'event', order: 5 },
      { title: 'School & Community Partnerships', description: 'Programs for schools, associations, clubs, and organizations looking for reliable indoor sports space.', features: ['After-school partnerships', 'Association rentals', 'Youth development initiatives'], category: 'partnership', icon: 'partnership', order: 6 },
    ];
    for (const p of programsData) await Program.create(p);

    // Memberships
    await Membership.insertMany([
      { name: 'Bronze', tier: 'bronze', badge: 'Starter', price: 99, description: 'Good for new players and families starting with structured weekly basketball activity.', features: ['Weekly academy access', 'Member booking priority', 'Community events access'], isPopular: false, order: 1, ctaText: 'Request Info' },
      { name: 'Silver', tier: 'silver', badge: 'Popular', price: 179, description: 'Best for players who want more consistent training, court access, and development.', features: ['Multiple academy sessions', 'Discounted camps and clinics', 'Priority league registration'], isPopular: true, order: 2, ctaText: 'Join Interest List' },
      { name: 'Gold', tier: 'gold', badge: 'Advanced', price: 249, description: 'Designed for committed athletes and families looking for deeper development support.', features: ['Expanded academy access', 'Skill development pathway', 'Member-only events'], isPopular: false, order: 3, ctaText: 'Request Info' },
    ]);

    // Pricing
    await Pricing.insertMany([
      { courtName: 'Basketball Half Court', offPeakPrice: 75, peakPrice: 95, icon: 'basketball', order: 1 },
      { courtName: 'Basketball Full Court', offPeakPrice: 140, peakPrice: 180, icon: 'basketball', order: 2 },
      { courtName: 'Volleyball Court', offPeakPrice: 120, peakPrice: 160, icon: 'volleyball', order: 3 },
      { courtName: 'Pickleball Court', offPeakPrice: 30, peakPrice: 40, icon: 'pickleball', order: 4 },
      { courtName: 'Badminton Court', offPeakPrice: 25, peakPrice: 35, icon: 'badminton', order: 5 },
      { courtName: 'Futsal / Indoor Soccer', offPeakPrice: 140, peakPrice: 180, icon: 'soccer', order: 6 },
      { courtName: 'Dodgeball Rental', offPeakPrice: 120, peakPrice: 160, icon: 'ball', order: 7 },
      { courtName: 'Floor Hockey Rental', offPeakPrice: 130, peakPrice: 170, icon: 'hockey', order: 8 },
    ]);

    // Offers
    await Offer.insertMany([
      { title: 'Founding Member Special', description: 'Be one of the first 50 members and lock in our lowest rate for life. Exclusive founding member benefits included.', discount: '20% OFF', badgeText: 'Limited Spots', badgeColor: 'orange', ctaText: 'Claim Offer', isFeatured: true, order: 1 },
      { title: 'Free First Visit / Trial Session', description: 'Try the Montreal Sports Center experience before you commit. Your first session is on us — no strings attached.', discount: 'FREE', badgeText: 'Try It Free', badgeColor: 'green', ctaText: 'Book Trial', order: 2 },
      { title: 'Family Membership Special', description: 'Enroll 2 or more family members and receive a special family rate with shared benefits and priority booking.', discount: 'Save $50/mo', badgeText: 'Family Deal', badgeColor: 'blue', ctaText: 'Learn More', order: 3 },
      { title: 'Birthday Party Launch Special', description: 'Book a birthday party event during our launch period and get 15% off the full package plus a free cake!', discount: '15% OFF', badgeText: 'Launch Special', badgeColor: 'purple', ctaText: 'Book Party', order: 4 },
    ]);

    // Testimonials
    await Testimonial.insertMany([
      { name: 'David Tremblay', role: 'Parent & Youth Academy Member', rating: 5, text: 'My son has improved dramatically since joining the youth academy. The coaches are professional, the facility is clean, and the community is welcoming.', program: 'Youth Basketball Academy', isFeatured: true, order: 1 },
      { name: 'Sarah Johnson', role: 'Adult League Player', rating: 5, text: 'Finally a proper indoor court in the West Island. The court rentals are affordable, the booking system is smooth, and the community atmosphere is amazing.', program: 'Adult League', order: 2 },
      { name: 'Coach Marcus Williams', role: 'Team Coach, DDO Warriors', rating: 5, text: 'MSC has given our team a professional home base. Court quality is excellent, management is responsive, and the environment supports serious development.', program: 'Court Rentals', order: 3 },
    ]);

    // Site Settings
    await SiteSettings.create({
      siteName: 'Montreal Sports Center',
      tagline: 'The Home of Basketball in the West Island',
      email: 'info@montrealsportscenter.ca',
      phone: '514-791-0738',
      address: 'West Island / Pointe-Claire, Quebec',
      area: 'Serving Pointe-Claire, DDO, Pierrefonds, Kirkland, Beaconsfield, Dorval and nearby areas',
      announcement: { text: 'Coming soon to the West Island of Montreal — Indoor basketball • Youth development • Community events', isActive: true },
      operatingHours: [
        { day: 'Monday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Tuesday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Wednesday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Thursday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Friday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Saturday', open: '8:00 AM', close: '9:00 PM' },
        { day: 'Sunday', open: '9:00 AM', close: '8:00 PM' },
      ]
    });

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder error:', err);
    process.exit(1);
  }
};

seed();
