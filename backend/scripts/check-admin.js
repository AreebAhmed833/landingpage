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

// Check admin
async function checkAdmin() {
  try {
    // Find admin by email
    const admin = await Admin.findOne({ email: 'admin@sample.com' });
    
    if (admin) {
      console.log('Admin found:');
      console.log('ID:', admin._id);
      console.log('Username:', admin.username);
      console.log('Email:', admin.email);
      console.log('Created at:', admin.createdAt);
    } else {
      console.log('No admin found with email admin@sample.com');
    }
    
    // List all admins
    const allAdmins = await Admin.find({});
    console.log('\nAll admins in database:');
    allAdmins.forEach(admin => {
      console.log(`- ${admin.email} (${admin.username})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin:', error);
    process.exit(1);
  }
}

checkAdmin(); 