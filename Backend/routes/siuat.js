const express = require('express');
const router = express.Router();
const SiuatRegistration = require('../models/SiuatRegistration');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUBLIC — Seat availability
router.get('/seats', async (req, res) => {
  try {
    const count = await SiuatRegistration.countDocuments();
    res.json({ filled: count, left: Math.max(0, 500 - count), total: 500 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — All results (completed exams)
router.get('/results', async (req, res) => {
  try {
    const regs = await SiuatRegistration.find({ score: { $ne: null } }).sort({ score: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Forgot App ID
router.post('/forgot-appid', async (req, res) => {
  try {
    const { mobile, email } = req.body;
    if (!mobile && !email) return res.status(400).json({ message: 'Please provide mobile or email.' });
    let reg;
    if (mobile) {
      const cleaned = mobile.trim().replace(/\s+/g, '');
      const digits = cleaned.replace(/^(\+91|91|0)/, '');
      reg = await SiuatRegistration.findOne({
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
      reg = await SiuatRegistration.findOne({
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
    const existing = await SiuatRegistration.findOne({ mobile: req.body.mobile });
    if (existing) return res.status(400).json({ success: false, message: `You are already registered. Your Application ID is: ${existing.appId}` });

    let idProofUrl = null;
    if (req.body.idProof && req.body.idProof.startsWith('data:')) {
      const uploaded = await cloudinary.uploader.upload(req.body.idProof, {
        folder: 'siu-siuat-idproofs',
        resource_type: 'auto',
        public_id: `id_${Date.now()}`,
      });
      idProofUrl = uploaded.secure_url;
    }

    const appId = 'SIU' + String(Date.now()).slice(-6);
    const reg = new SiuatRegistration({ ...req.body, appId, idProof: idProofUrl });
    await reg.save();
    res.json({ success: true, appId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADMIN — Get all
// NOTE: Must be defined BEFORE the /:appId wildcard route
router.get('/admin/all', auth, async (req, res) => {
  try {
    const regs = await SiuatRegistration.find().sort({ registeredAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Approve / Reject
router.patch('/admin/status/:appId', auth, async (req, res) => {
  try {
    const reg = await SiuatRegistration.findOneAndUpdate(
      { appId: req.params.appId },
      { status: req.body.status },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Verify ID proof
router.patch('/admin/verify-id/:appId', auth, async (req, res) => {
  try {
    const reg = await SiuatRegistration.findOneAndUpdate(
      { appId: req.params.appId },
      { idVerified: req.body.idVerified },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Reset exam
router.patch('/admin/reset/:appId', auth, async (req, res) => {
  try {
    const reg = await SiuatRegistration.findOneAndUpdate(
      { appId: req.params.appId },
      { score: null, grade: null, sectionData: null, examOverride: true },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Override exam date
router.patch('/admin/override/:appId', auth, async (req, res) => {
  try {
    const reg = await SiuatRegistration.findOneAndUpdate(
      { appId: req.params.appId },
      { examOverride: req.body.examOverride },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Approve all pending
router.patch('/admin/approve-all', auth, async (req, res) => {
  try {
    await SiuatRegistration.updateMany({ status: 'Pending' }, { status: 'Approved' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUBLIC — Get single by appId (exam login)
// NOTE: This wildcard must stay AFTER all specific routes
router.get('/:appId', async (req, res) => {
  try {
    const reg = await SiuatRegistration.findOne({ appId: req.params.appId.toUpperCase() });
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
    const reg = await SiuatRegistration.findOneAndUpdate(
      { appId: req.params.appId },
      { score, grade, sectionData },
      { new: true }
    );
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
