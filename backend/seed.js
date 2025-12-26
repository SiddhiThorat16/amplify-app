// amplify-app/backend/seed.js

const mongoose = require('mongoose');
const Track = require('./models/track.model');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Track.create([
      { title: 'Sample Track 1', artist: 'Artist A', category: 'rock', audioUrl: 'http://example.com/track1.mp3' },
      { title: 'Sample Track 2', artist: 'Artist B', category: 'pop', audioUrl: 'http://example.com/track2.mp3' },
    ]);
    console.log('✅ Seeded data');
    process.exit();
  });
