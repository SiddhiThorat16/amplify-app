// amplify-app/backend/models/track.model.js

const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audioUrl: { type: String, required: true }, // will be file URL
  coverImage: { type: String },
  duration: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);
