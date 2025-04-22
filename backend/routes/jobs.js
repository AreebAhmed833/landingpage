const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const JobApplication = require('../models/JobApplication');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF, DOC, DOCX files are allowed!');
    }
  }
});

// Submit job application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, jobTitle, name, email, phone, coverLetter } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const application = new JobApplication({
      jobId,
      jobTitle,
      name,
      email,
      phone,
      coverLetter,
      resumeUrl: req.file.path
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get all applications (protected route - add authentication middleware in production)
router.get('/applications', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Update application status
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
});

module.exports = router; 