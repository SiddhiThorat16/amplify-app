// amplify-app/backend/routes/stream.routes.js

const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/track.model');

const router = express.Router();

const getBucket = () => {
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'audioFiles',
  });
};

// GET /api/stream/:trackId
router.get('/:trackId', async (req, res) => {
  try {
    const track = await Track.findById(req.params.trackId);
    if (!track) return res.status(404).json({ error: 'Track not found' });

    const bucket = getBucket();
    const downloadStream = bucket.openDownloadStream(track.gridFsId);

    res.set('Content-Type', track.mimeType || 'audio/mpeg');

    downloadStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.sendStatus(404);
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error('Fetch stream error:', err);
    res.status(500).json({ error: 'Failed to stream audio' });
  }
});

module.exports = router;
