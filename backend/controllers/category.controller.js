// amplify-app/backend/controllers/category.controller.js

const Category = require('../models/category.model');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories, count: categories.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};
