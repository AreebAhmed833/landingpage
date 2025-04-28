"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Job_1 = require("../models/Job");
const Application_1 = require("../models/Application");
const router = express_1.default.Router();
// Configure multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job_1.Job.find();
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});
// Create a new job
router.post('/', async (req, res) => {
    try {
        const job = new Job_1.Job(req.body);
        await job.save();
        res.status(201).json(job);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating job' });
    }
});
// Submit an application
router.post('/applications', upload.single('resume'), async (req, res) => {
    var _a;
    try {
        const application = new Application_1.Application({
            ...req.body,
            resumePath: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
        });
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error submitting application' });
    }
});
exports.default = router;
