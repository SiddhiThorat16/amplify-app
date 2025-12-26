// amplify-app/backend/models/podcast.model.js

const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  host: { type: String, required: true },
  category: { type: String, required: true }, // "tech", "news", "education"
  audioUrl: { type: String, required: true },
  duration: { type: Number, default: 1800 }, // seconds
  thumbnail: { type: String },
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
}, { timestamps: true });

module.exports = mongoose.model('Podcast', podcastSchema);
