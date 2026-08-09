const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ��� � � ✅ CRITICAL: Body parser MUST be first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ��� � � ✅ Logging middleware to debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// ��� � � ✅ CORS and security (after body parser)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://localhost:5000"]
    }
  }
}));
app.use(cors({
  origin: ['https://localhost:5173', 'https://localhost:5174', 'https://localhost:5175', 'https://localhost:5176'],
  credentials: true,
}));

// ��� � � ✅ Routes
const authRoutes = require('./routes/authRoutes');
const organisationRoutes = require('./routes/organisationRoutes');
const pollRoutes = require('./routes/pollRoutes');
const { protect } = require('./middleware/authMiddleware');

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);
app.use('/api/polls', pollRoutes);

// Test routes
app.get('/test', (req, res) => {
  res.json({ message: 'Hello from PulseVote backend!', status: 'ok' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API test endpoint working!' });
});

// Protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}!`,
    user: {
      id: req.user.id,
      email: req.user.email,
    },
    timestamp: new Date(),
  });
});

// ��� � � ✅ 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.url);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    url: req.url
  });
});

// ��� � � ✅ Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

module.exports = app;