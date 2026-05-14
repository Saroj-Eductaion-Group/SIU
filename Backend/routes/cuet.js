const express = require('express');
const router = express.Router();
const CuetRegistration = require('../models/CuetRegistration');

// PUBLIC — Register new CUET candidate
router.post('/register', async (req, res) => {
  try {
    const existing = await CuetRegistration.findOne({ mobile: req.body.mobile });
    if (existing) {
      return res.json({ success: true, cuetId: existing.cuetId, alreadyExists: true });
    }
    const cuetId = 'CUET2026' + Math.floor(100000 + Math.random() * 900000);
    const reg = new CuetRegistration({ ...req.body, cuetId });
    await reg.save();
    res.json({ success: true, cuetId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUBLIC — Login by CUET ID
router.get('/login/:cuetId', async (req, res) => {
  try {
    const reg = await CuetRegistration.findOne({ cuetId: req.params.cuetId.toUpperCase() });
    if (!reg) return res.status(404).json({ message: 'CUET ID not found. Please register first.' });
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Save mock test result for a candidate
router.post('/result/:cuetId', async (req, res) => {
  try {
    const reg = await CuetRegistration.findOneAndUpdate(
      { cuetId: req.params.cuetId },
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
router.get('/results/:cuetId', async (req, res) => {
  try {
    const reg = await CuetRegistration.findOne({ cuetId: req.params.cuetId });
    if (!reg) return res.status(404).json({ message: 'Not found' });
    res.json(reg.mockResults || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
