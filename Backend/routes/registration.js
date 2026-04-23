const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');

// PUBLIC — Get all results (only completed exams)
router.get('/results', async (req, res) => {
  try {
    const regs = await Registration.find({ score: { $ne: null } }).sort({ score: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Forgot App ID (by mobile or email)
router.post('/forgot-appid', async (req, res) => {
  try {
    const { mobile, email } = req.body;
    if (!mobile && !email) return res.status(400).json({ message: 'Please provide mobile or email.' });
    
    let reg;
    if (mobile) {
      const cleaned = mobile.trim().replace(/\s+/g, '');
      // match with or without +91, 0, 91 prefix
      const digits = cleaned.replace(/^(\+91|91|0)/, '');
      reg = await Registration.findOne({
        $or: [
          { mobile: cleaned },
          { mobile: '+91' + digits },
          { mobile: '91' + digits },
          { mobile: digits },
          { mobile: '0' + digits }
        ]
      });
    } else {
      const emailClean = email.trim().toLowerCase();
      reg = await Registration.findOne({
        email: { $regex: new RegExp('^' + emailClean + '$', 'i') }
      });
    }
    
    if (!reg) return res.status(404).json({ message: 'No registration found. Please check and try again.' });
    res.json({ appId: reg.appId, name: `${reg.firstName} ${reg.lastName}`, examDate: reg.examDate, status: reg.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Register new candidate
router.post('/register', async (req, res) => {
  try {
    // Check duplicate mobile
    const existing = await Registration.findOne({ mobile: req.body.mobile });
    if (existing) return res.status(400).json({ success: false, message: `You are already registered with this mobile number. Your Application ID is: ${existing.appId}` });
    const appId = 'SIU' + String(Date.now()).slice(-6);
    const reg = new Registration({ ...req.body, appId });
    await reg.save();
    res.json({ success: true, appId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUBLIC — Get single by appId (exam login)
router.get('/:appId', async (req, res) => {
  try {
    const reg = await Registration.findOne({ appId: req.params.appId.toUpperCase() });
    if (!reg) return res.status(404).json({ message: 'Not found' });
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Submit exam result
router.patch('/result/:appId', async (req, res) => {
  try {
    const { score, grade, sectionData } = req.body;
    const reg = await Registration.findOneAndUpdate(
      { appId: req.params.appId },
      { score, grade, sectionData },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN PROTECTED — Get all registrations
router.get('/admin/all', auth, async (req, res) => {
  try {
    const regs = await Registration.find().sort({ registeredAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN PROTECTED — Approve / Reject
router.patch('/admin/status/:appId', auth, async (req, res) => {
  try {
    const reg = await Registration.findOneAndUpdate(
      { appId: req.params.appId },
      { status: req.body.status },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN PROTECTED — Reset exam (for retake)
router.patch('/admin/reset/:appId', auth, async (req, res) => {
  try {
    const reg = await Registration.findOneAndUpdate(
      { appId: req.params.appId },
      { score: null, grade: null, sectionData: null, examOverride: true },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN PROTECTED — Override exam date (allow exam anytime)
router.patch('/admin/override/:appId', auth, async (req, res) => {
  try {
    const reg = await Registration.findOneAndUpdate(
      { appId: req.params.appId },
      { examOverride: req.body.examOverride },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN PROTECTED — Approve all pending
router.patch('/admin/approve-all', auth, async (req, res) => {
  try {
    await Registration.updateMany({ status: 'Pending' }, { status: 'Approved' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
