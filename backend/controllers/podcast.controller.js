// amplify-app/backend/controllers/podcast.controller.js

const Podcast = require('../models/podcast.model');

exports.getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 }).limit(20);
    res.json({ podcasts, count: podcasts.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch podcasts' });
  }
};
