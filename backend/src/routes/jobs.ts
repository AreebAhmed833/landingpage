import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Job } from '../models/Job';
import { Application } from '../models/Application';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Create a new job
router.post('/', async (req: Request, res: Response) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job' });
  }
});

// Get all applications
router.get('/applications', async (req: Request, res: Response) => {
  try {
    const applications = await Application.find().populate('jobId', 'title');
    const formattedApplications = applications.map(app => ({
      ...app.toObject(),
      jobTitle: app.jobId.title
    }));
    res.json(formattedApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Update application status
router.put('/applications/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status' });
  }
});

// Submit an application
const uploadMiddleware = upload.single('resume');
router.post('/applications', (req: Request, res: Response, next: Function) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req: Request, res: Response) => {
  try {
    const application = new Application({
      ...req.body,
      resumePath: (req as any).file?.path
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application' });
  }
});

export default router; 