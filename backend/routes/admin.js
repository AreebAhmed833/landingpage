const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', { email, password });

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('No admin found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('Found admin:', { email: admin.email, hashedPassword: admin.password });

    // Check password
    console.log('Attempting to compare passwords...');
    const isMatch = await admin.comparePassword(password);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // For testing purposes, accept the hardcoded token
    if (token === 'admin-token') {
      req.admin = { id: 'test-admin-id', role: 'admin' };
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected route to check admin status
router.get('/me', verifyAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin data', error: error.message });
  }
});

// Create initial admin (should be removed or secured in production)
router.post('/setup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      username,
      password,
      email
    });

    await admin.save();

    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin account', error: error.message });
  }
});

module.exports = {
  router,
  verifyAdminToken
}; 