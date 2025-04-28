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

// Delete admin
async function deleteAdmin() {
  try {
    const result = await Admin.deleteOne({ email: 'admin@sample.com' });
    if (result.deletedCount > 0) {
      console.log('Admin user deleted successfully');
    } else {
      console.log('No admin user found to delete');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error deleting admin:', error);
    process.exit(1);
  }
}

deleteAdmin(); 