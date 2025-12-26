// amplify-app/backend/controllers/track.controller.js

const Track = require('../models/track.model');

exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 }).limit(50);
    res.json({ tracks, count: tracks.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tracks' });
  }
};
