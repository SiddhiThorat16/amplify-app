// amplify-app/backend/routes/listeningHistory.routes.js

const express = require('express');
const ListeningHistory = require('../models/listeningHistory.model');
const User = require('../models/user.model');
const Track = require('../models/track.model');

const router = express.Router();

// GET /api/listening-history - recently played (last 10)
router.get('/', async (req, res) => {
  try {
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    const history = await ListeningHistory.find({ user: firstUser._id })
      .populate('track')
      .sort({ lastPlayed: -1 })
      .limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// POST /api/listening-history/update-position
router.post('/update-position', async (req, res) => {
  try {
    const { trackId, position } = req.body;
    const firstUser = await User.findOne().sort({ createdAt: -1 });

    let history = await ListeningHistory.findOne({ 
      user: firstUser._id, 
      track: trackId 
    });

    if (history) {
      history.lastPosition = position;
      history.lastPlayed = new Date();
      history.playCount += 1;
    } else {
      history = new ListeningHistory({
        user: firstUser._id,
        track: trackId,
        lastPosition: position,
        playCount: 1
      });
    }

    await history.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save position' });
  }
});

// GET /api/listening-history/:trackId/resume
router.get('/:trackId/resume', async (req, res) => {
  try {
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    const history = await ListeningHistory.findOne({ 
      user: firstUser._id, 
      track: req.params.trackId 
    });
    
    res.json({ 
      lastPosition: history?.lastPosition || 0,
      hasResume: !!history 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume data' });
  }
});

module.exports = router;
