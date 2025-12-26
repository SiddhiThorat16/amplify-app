// amplify-app/backend/scripts/seedPodcasts.js

const mongoose = require('mongoose');
require('dotenv').config();
const Podcast = require('../models/podcast.model');
const Episode = require('../models/episode.model');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

async function seedPodcasts() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI / MONGODB_URI missing');

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB (podcast seed)');

    await Podcast.deleteMany({});
    await Episode.deleteMany({});

    const techPod = await Podcast.create({
      title: 'Tech Talks Daily',
      host: 'Siddhi Thorat',
      category: 'tech',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // trailer / main audio
      duration: 1800,
      thumbnail: '',
    });

    const mindsetPod = await Podcast.create({
      title: 'Mindset Matters',
      host: 'Alex Ray',
      category: 'mindset',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', // trailer / main audio
      duration: 1800,
      thumbnail: '',
    });

    const episodes = await Episode.insertMany([
      {
        podcast: techPod._id,
        title: 'The Future of JavaScript',
        description: 'Discussing new JS features and ecosystem.',
        audioUrl:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: 2100,
        episodeNumber: 1,
      },
      {
        podcast: techPod._id,
        title: 'Scaling Node.js Apps',
        description: 'Patterns and practices for scaling Node backends.',
        audioUrl:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: 1900,
        episodeNumber: 2,
      },
      {
        podcast: mindsetPod._id,
        title: 'Deep Work in a Noisy World',
        description: 'How to focus as a developer.',
        audioUrl:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        duration: 2000,
        episodeNumber: 1,
      },
    ]);

    // attach episode ids to podcasts
    const grouped = episodes.reduce((acc, ep) => {
      acc[ep.podcast] = acc[ep.podcast] || [];
      acc[ep.podcast].push(ep._id);
      return acc;
    }, {});

    await Podcast.findByIdAndUpdate(techPod._id, {
      episodes: grouped[techPod._id] || [],
    });
    await Podcast.findByIdAndUpdate(mindsetPod._id, {
      episodes: grouped[mindsetPod._id] || [],
    });

    console.log('Seeded podcasts + episodes');
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedPodcasts();
