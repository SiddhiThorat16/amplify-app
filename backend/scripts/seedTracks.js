// amplify-app/backend/scripts/seedTracks.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI; // 👈 change here

console.log('MONGO_URI from env =>', MONGO_URI);

async function seed() {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGODB_URI is not defined. Check backend/.env');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB, seeding...');

    // TODO: add Track model logic here after connection works

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
