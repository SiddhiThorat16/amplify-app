// amplify-app/backend/scripts/seedCategories.js

// backend/scripts/seedCategories.js
const mongoose = require('mongoose');
require('dotenv').config();
const Track = require('../models/track.model');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

async function seedCategories() {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI / MONGODB_URI is not defined');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB, inserting chill/house/lofi tracks...');

    await Track.insertMany([
      {
        title: 'Chill Beats Vol 1',
        artist: 'DJ Serenity',
        category: 'chill',
        audioUrl:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 225, // ~3:45 in seconds
        plays: 1245,
      },
      {
        title: 'Deep House Dreams',
        artist: 'Neon Pulse',
        category: 'house',
        audioUrl:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 252, // ~4:12
        plays: 892,
      },
      {
        title: 'Lo-Fi Rain',
        artist: 'Rainy Days',
        category: 'lofi',
        audioUrl:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 178, // ~2:58
        plays: 2156,
      },
    ]);

    console.log('Inserted chill / house / lofi tracks.');
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Seed categories error:', err);
    process.exit(1);
  }
}

seedCategories();
