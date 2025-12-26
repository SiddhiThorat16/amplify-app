// amplify-app/backend/models/category.model.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['music', 'podcast'], required: true },
  color: { type: String, default: '#3b82f6' },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
