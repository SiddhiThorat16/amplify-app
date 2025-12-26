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

module.exports = router;
