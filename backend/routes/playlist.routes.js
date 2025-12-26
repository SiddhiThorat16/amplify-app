// amplify-app/backend/routes/playlist.routes.js

const express = require('express');
const Playlist = require('../models/playlist.model');
const User = require('../models/user.model');
const Track = require('../models/track.model');

const router = express.Router();

// GET /api/playlists - CURRENT user's playlists ONLY
router.get('/', async (req, res) => {
  try {
    // Get first user from DB (simulate current user)
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    if (!firstUser) return res.status(404).json({ error: 'No users found' });
    
    const playlists = await Playlist.find({ user: firstUser._id }).sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// POST /api/playlists - create for CURRENT user
router.post('/', async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    
    // Get first user from DB (simulate current user)
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    if (!firstUser) return res.status(404).json({ error: 'No users found' });

    const playlist = await Playlist.create({
      user: firstUser._id,  // ← CURRENT user only
      name,
      description,
      isPublic: !!isPublic,
      tracks: [],
    });

    res.status(201).json(playlist);
  } catch (err) {
    console.error('Error creating playlist:', err);
    res.status(500).json({ error: 'Failed to create playlist', details: err.message });
  }
});

// GET /api/playlists/:id - single playlist
router.get('/:id', async (req, res) => {
  try {
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    const playlist = await Playlist.findOne({ 
      _id: req.params.id, 
      user: firstUser._id  // ← Only current user's playlist
    }).populate('tracks');
    
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    console.error('Error fetching playlist:', err);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

// POST /api/playlists/:id/tracks - ADD track
router.post('/:id/tracks', async (req, res) => {
  try {
    const { trackId } = req.body;
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    const playlist = await Playlist.findOne({ _id: req.params.id, user: firstUser._id });
    
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    
    // Check if track exists
    const track = await Track.findById(trackId);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    
    // Prevent duplicates
    if (!playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId);
      await playlist.save();
    }
    
    const updated = await Playlist.findById(req.params.id).populate('tracks');
    res.json(updated);
  } catch (err) {
    console.error('Error adding track:', err);
    res.status(500).json({ error: 'Failed to add track' });
  }
});

// DELETE /api/playlists/:id/tracks/:trackId - REMOVE track
router.delete('/:id/tracks/:trackId', async (req, res) => {
  try {
    const firstUser = await User.findOne().sort({ createdAt: -1 });
    const playlist = await Playlist.findOne({ _id: req.params.id, user: firstUser._id });
    
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    
    playlist.tracks = playlist.tracks.filter(t => t.toString() !== req.params.trackId);
    await playlist.save();
    
    const updated = await Playlist.findById(req.params.id).populate('tracks');
    res.json(updated);
  } catch (err) {
    console.error('Error removing track:', err);
    res.status(500).json({ error: 'Failed to remove track' });
  }
});

module.exports = router;
