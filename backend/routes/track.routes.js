// amplify-app/backend/routes/track.routes.js

const express = require('express');
const router = express.Router();
const Track = require('../models/track.model');

// GET /api/tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

// GET /api/tracks/search?q=query&category=music
router.get('/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }
    
    const searchQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { artist: { $regex: q, $options: 'i' } }
      ]
    };
    
    if (category) {
      searchQuery.category = category;
    }
    
    const tracks = await Track.find(searchQuery).limit(20);
    res.json(tracks);
  } catch (error) {
    console.error('Error searching tracks:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
