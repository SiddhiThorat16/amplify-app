// amplify-app/backend/routes/category.routes.js

const express = require('express');
const { getCategories } = require('../controllers/category.controller');
const router = express.Router();

router.get('/', getCategories);

module.exports = router;
