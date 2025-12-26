// amplify-app/backend/src/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Track = require('../models/track.model');
const authRoutes = require('../routes/auth.routes');
const trackRoutes = require('../routes/track.routes');
const podcastRoutes = require('../routes/podcast.routes');
const categoryRoutes = require('../routes/category.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Auth routes (register/login)
app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/categories', categoryRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'Amplify backend live 🎵', db: 'MongoDB' });
});

// Sample GET /api/tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tracks' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Amplify backend running at http://localhost:${PORT}`);
});
