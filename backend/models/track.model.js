// amplify-app/backend/models/track.model.js

const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  category: { type: String, required: true }, // "rock", "pop", "hiphop"
  audioUrl: { type: String, required: true },
  duration: { type: Number, default: 180 }, // seconds
  thumbnail: { type: String },
  plays: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);
