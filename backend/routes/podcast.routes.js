// amplify-app/backend/routes/podcast.routes.js

const express = require('express');
const Podcast = require('../models/podcast.model');
const Episode = require('../models/episode.model');

const router = express.Router();

// GET /api/podcasts - list podcasts
router.get('/', async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (err) {
    console.error('Error fetching podcasts:', err);
    res.status(500).json({ error: 'Failed to fetch podcasts' });
  }
});

// GET /api/podcasts/:id - podcast detail + episodes
router.get('/:id', async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json({ error: 'Podcast not found' });

    const episodes = await Episode.find({ podcast: podcast._id }).sort({
      episodeNumber: -1,
      publishedAt: -1,
    });

    res.json({ podcast, episodes });
  } catch (err) {
    console.error('Error fetching podcast detail:', err);
    res.status(500).json({ error: 'Failed to fetch podcast detail' });
  }
});

module.exports = router;
