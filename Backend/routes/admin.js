const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin)
      return res.status(401).json({ message: 'Invalid credentials' });

    const match = await admin.comparePassword(password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, name: admin.name, email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify token (frontend can call this to check if still logged in)
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// Change password — protected
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Both fields required.' });
    if (newPassword.length < 6)
      return res.status(400).json({ message: 'New password must be at least 6 characters.' });
    const admin = await Admin.findById(req.admin.id);
    const match = await admin.comparePassword(currentPassword);
    if (!match) return res.status(401).json({ message: 'Current password is incorrect.' });
    admin.password = newPassword;
    await admin.save();
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed first admin — ONLY works if no admin exists yet
router.post('/setup', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0)
      return res.status(403).json({ message: 'Admin already exists. Use login.' });

    const { email, password, name } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const admin = new Admin({ email, password, name: name || 'Admin' });
    await admin.save();
    res.json({ message: 'Admin created successfully. You can now login.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auto-seed default admin if none exists
const seedDefaultAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const defaultAdmin = new Admin({
        email: 'admin@sarojuniversity.edu.in',
        password: 'SIU@Admin2026',
        name: 'System Administrator'
      });
      await defaultAdmin.save();
      console.log('🟢 Default admin account successfully seeded (admin@sarojuniversity.edu.in)');
    }
  } catch (err) {
    console.error('❌ Failed to auto-seed default admin:', err.message);
  }
};

// Mongoose buffers commands, so we can trigger this safely on load
seedDefaultAdmin();

module.exports = router;

