// amplify-app/backend/models/playlist.model.js

const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Playlist', playlistSchema);
