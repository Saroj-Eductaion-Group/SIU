const express = require('express');
const router = express.Router();
const NeetRegistration = require('../models/NeetRegistration');
const auth = require('../middleware/auth');

// PUBLIC — Get all NEET registrations with mock results (leaderboard)
router.get('/admin/all', async (req, res) => {
  try {
    const regs = await NeetRegistration.find(
      { 'mockResults.0': { $exists: true } },
      { neetId:1, firstName:1, lastName:1, city:1, state:1, mockResults:1, registeredAt:1 }
    ).sort({ registeredAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Get all results (for Results tab)
router.get('/results-all', async (req, res) => {
  try {
    const regs = await NeetRegistration.find(
      { 'mockResults.0': { $exists: true } },
      { neetId:1, firstName:1, lastName:1, city:1, state:1, mockResults:1, registeredAt:1 }
    ).sort({ registeredAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Register new NEET candidate
router.post('/register', async (req, res) => {
  try {
    const mobile = req.body.mobile ? req.body.mobile.trim() : '';
    const existing = await NeetRegistration.findOne({ mobile });
    if (existing) {
      return res.json({ success: true, neetId: existing.neetId, alreadyExists: true });
    }
    // Generate unique NEET ID
    const neetId = 'NEET2026' + Math.floor(100000 + Math.random() * 900000);
    const reg = new NeetRegistration({ ...req.body, neetId });
    await reg.save();
    res.json({ success: true, neetId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUBLIC — Login by NEET ID
router.get('/login/:neetId', async (req, res) => {
  try {
    const id = req.params.neetId.toUpperCase();
    const reg = await NeetRegistration.findOne({ neetId: id });
    if (!reg) return res.status(404).json({ message: 'NEET/CUET ID not found. Please register first.' });
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Save mock test result for a candidate
router.post('/result/:neetId', async (req, res) => {
  try {
    const id = req.params.neetId.toUpperCase();
    const reg = await NeetRegistration.findOneAndUpdate(
      { neetId: id },
      { $push: { mockResults: { ...req.body, savedAt: new Date() } } },
      { new: true }
    );
    if (!reg) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Get all mock results for a candidate
router.get('/results/:neetId', async (req, res) => {
  try {
    const id = req.params.neetId.toUpperCase();
    const reg = await NeetRegistration.findOne({ neetId: id });
    if (!reg) return res.status(404).json({ message: 'Candidate not found' });
    res.json(reg.mockResults || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
