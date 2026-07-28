require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const registerRoutes = require('./routes/index');

const app = express();
connectDB();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  ...(process.env.FRONTEND_URL || '').split(',').map((s) => s.trim()).filter(Boolean),
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(new URL(origin).hostname)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

registerRoutes(app);

// Dashboard stats endpoint
app.get('/api/dashboard/stats', require('./middleware/auth').protect, async (req, res) => {
  try {
    const [Inquiry, Program, Blog, Gallery, Testimonial] = [
      require('./models/Inquiry'), require('./models/Program'),
      require('./models/Blog'), require('./models/Gallery'),
      require('./models/Testimonial')
    ];
    const [totalInquiries, newInquiries, totalPrograms, totalPosts, totalGallery, totalTestimonials] = await Promise.all([
      Inquiry.countDocuments(), Inquiry.countDocuments({ status: 'new' }),
      Program.countDocuments({ isActive: true }), Blog.countDocuments({ isPublished: true }),
      Gallery.countDocuments({ isActive: true }), Testimonial.countDocuments({ isActive: true })
    ]);
    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, data: { totalInquiries, newInquiries, totalPrograms, totalPosts, totalGallery, totalTestimonials, recentInquiries } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/', (req, res) => res.json({ message: 'MSC API is running', version: '1.0.0' }));
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err?.stack || err?.message || err);
  res.status(err?.http_code || 500).json({ success: false, message: err?.message || 'Internal server error' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🏀 MSC Server running on port ${PORT}`));
}

module.exports = app;
