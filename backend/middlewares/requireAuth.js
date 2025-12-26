// amplify-app/backend/middlewares/requireAuth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Login required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback');
    req.user = await User.findById(decoded.id);
    
    if (!req.user) return res.status(401).json({ error: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = requireAuth;
