require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/landingpage')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Create default admin
async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@sample.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }
    
    // Create new admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@sample.com',
      password: 'admin'
    });
    
    await admin.save();
    console.log('Default admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createDefaultAdmin(); 