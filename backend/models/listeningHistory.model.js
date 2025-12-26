// amplify-app/backend/models/listeningHistory.model.js

const mongoose = require('mongoose');

const listeningHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true
  },
  lastPosition: {
    type: Number,
    default: 0,  // seconds
    min: 0
  },
  lastPlayed: {
    type: Date,
    default: Date.now
  },
  playCount: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ListeningHistory', listeningHistorySchema);
