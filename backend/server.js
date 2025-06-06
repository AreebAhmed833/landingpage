const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const { router: adminRoutes, verifyAdminToken } = require('./routes/admin');
const jobsRoutes = require('./routes/jobs');
const Admin = require('./models/Admin');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/resumes');
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:5174'], // Frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// MongoDB Connection Options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    // Create default admin if none exists
    try {
      const adminExists = await Admin.findOne({ email: 'admin@sample.com' });
      if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);
        const defaultAdmin = new Admin({
          username: 'admin',
          email: 'admin@sample.com',
          password: hashedPassword
        });
        await defaultAdmin.save();
        console.log('Default admin user created');
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Log all database operations in development
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Apply admin token verification to specific routes
app.use('/api/jobs/applications', verifyAdminToken);
app.use('/api/jobs', jobsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 