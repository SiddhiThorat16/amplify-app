// amplify-app/backend/routes/adminUpload.routes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Track = require('../models/track.model');

const router = express.Router();

// Ensure uploads dir exists: backend/uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

// POST /api/admin/upload-audio
router.post('/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    const { title, artist, category } = req.body;
    const file = req.file;

    console.log('DEBUG upload body:', { title, artist, category });
    console.log(
      'DEBUG upload file:',
      file && {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        filename: file.filename,
      }
    );

    if (!file || !title || !artist) {
      return res
        .status(400)
        .json({ error: 'title, artist and audio file are required' });
    }

    // Local URL (served statically from /uploads)
    const audioUrl = `/uploads/${file.filename}`;

    const track = await Track.create({
      title,
      artist,
      category: category || 'music',
      audioUrl,
    });

    res.status(201).json(track);
  } catch (err) {
    console.error('Admin upload error:', err);
    res.status(500).json({ error: 'Failed to upload audio' });
  }
});

module.exports = router;
