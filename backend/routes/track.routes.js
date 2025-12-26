// amplify-app/backend/routes/track.routes.js

const express = require('express');
const { getTracks } = require('../controllers/track.controller');
const router = express.Router();

router.get('/', getTracks);

module.exports = router;
