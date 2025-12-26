// amplify-app/backend/models/episode.model.js

const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema(
  {
    podcast: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true },
    title: { type: String, required: true },
    description: { type: String },
    audioUrl: { type: String, required: true },
    duration: { type: Number, default: 1800 }, // seconds
    episodeNumber: { type: Number },
    publishedAt: { type: Date, default: Date.now },
    plays: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Episode', episodeSchema);
