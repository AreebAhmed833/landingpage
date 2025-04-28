require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import the Admin model
const { Admin } = require('../dist/models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/landingpage';

async function resetAdminPassword() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Hash the password 'admin' with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    console.log('Generated hash:', hashedPassword);

    // Update or create admin user
    const admin = await Admin.findOneAndUpdate(
      { email: 'admin@sample.com' },
      {
        email: 'admin@sample.com',
        password: hashedPassword,
        username: 'admin'
      },
      { upsert: true, new: true }
    );

    // Verify the password works
    const isMatch = await bcrypt.compare('admin', admin.password);
    console.log('Password verification:', isMatch);

    console.log('Admin password reset successfully');
    console.log('Admin details:', {
      id: admin._id,
      email: admin.email,
      username: admin.username
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error resetting admin password:', error);
    process.exit(1);
  }
}

resetAdminPassword(); 