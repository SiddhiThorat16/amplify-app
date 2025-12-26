// amplify-app/backend/routes/podcast.routes.js

const express = require('express');
const { getPodcasts } = require('../controllers/podcast.controller');
const router = express.Router();

router.get('/', getPodcasts);

module.exports = router;
