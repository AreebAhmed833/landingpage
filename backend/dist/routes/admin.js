"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("../models/Admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Admin registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, adminCode } = req.body;
        // Verify admin code (you should store this securely in environment variables)
        if (adminCode !== process.env.ADMIN_CODE) {
            return res.status(400).json({ message: 'Invalid admin code' });
        }
        // Check if admin already exists
        const existingAdmin = await Admin_1.Admin.findOne({
            $or: [{ email }, { username }]
        });
        if (existingAdmin) {
            return res.status(400).json({
                message: 'Admin with this email or username already exists'
            });
        }
        // Create new admin
        const admin = new Admin_1.Admin({
            username,
            email,
            password
        });
        await admin.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            message: 'Admin registered successfully',
            token
        });
    }
    catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Error registering admin' });
    }
});
// Admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find admin by email
        const admin = await Admin_1.Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Verify password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({
            message: 'Login successful',
            token
        });
    }
    catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.default = router;
