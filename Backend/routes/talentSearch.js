const express = require('express');
const router = express.Router();
const TalentSearchRegistration = require('../models/TalentSearchRegistration');

// In-memory OTP storage with 10-minute expiry
const otpCache = new Map();

// Helper to normalize Indian phone number (10 digits)
function normalizeMobile(mobile) {
  if (!mobile) return '';
  return mobile.toString().replace(/\D/g, '').slice(-10);
}

// 1. POST /api/talent-search/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const rawMobile = req.body.mobile;
    const mobile = normalizeMobile(rawMobile);

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
    }

    // Check if candidate has already taken the test
    const existingCandidate = await TalentSearchRegistration.findOne({ mobile });
    if (existingCandidate && existingCandidate.hasAttempted) {
      return res.json({
        success: false,
        alreadyAttempted: true,
        candidate: existingCandidate,
        message: 'You have already attempted the Level 1 Test with this mobile number. Only one attempt is permitted.'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpCache.set(mobile, { otp, expiresAt, verified: false });

    console.log(`[TalentSearch OTP] Generated OTP for ${mobile}: ${otp}`);

    // Return success. We include `otp` for immediate user experience & seamless verification
    return res.json({
      success: true,
      message: `OTP sent successfully to +91-${mobile}`,
      otp, // Provided for instant client verification without SMS gateway lock
    });
  } catch (err) {
    console.error('Error in send-otp:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2. POST /api/talent-search/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const mobile = normalizeMobile(req.body.mobile);
    const userOtp = req.body.otp ? req.body.otp.toString().trim() : '';

    if (!mobile || !userOtp) {
      return res.status(400).json({ success: false, message: 'Mobile and OTP are required.' });
    }

    const cached = otpCache.get(mobile);

    // Master test OTP for demonstration or match cached OTP
    const isValid = (cached && cached.otp === userOtp && Date.now() <= cached.expiresAt) || userOtp === '123456';

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please try again.' });
    }

    if (cached) {
      cached.verified = true;
    } else {
      otpCache.set(mobile, { otp: userOtp, verified: true, expiresAt: Date.now() + 10 * 60 * 1000 });
    }

    return res.json({
      success: true,
      message: 'Mobile number verified successfully!'
    });
  } catch (err) {
    console.error('Error in verify-otp:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3. POST /api/talent-search/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, stream } = req.body;
    const mobile = normalizeMobile(req.body.mobile);

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
    }
    const validStreams = ['PCM', 'PCB', 'PCM+Bio', 'Commerce', 'Arts', 'Humanities'];
    if (!stream || !validStreams.includes(stream)) {
      return res.status(400).json({ success: false, message: 'Please select a valid Class 12 stream.' });
    }

    // Check if already attempted
    let candidate = await TalentSearchRegistration.findOne({
      $or: [{ mobile }, { email: email.toLowerCase().trim() }]
    });

    if (candidate && candidate.hasAttempted) {
      return res.json({
        success: false,
        alreadyAttempted: true,
        candidate,
        message: 'You have already attempted the Level 1 Test. Each student is allowed only one attempt.'
      });
    }

    // Assign a random paper set from Set A, Set B, Set C, Set D
    const paperSets = ['Set A', 'Set B', 'Set C', 'Set D'];
    const assignedSet = paperSets[Math.floor(Math.random() * paperSets.length)];

    if (candidate) {
      // Update existing unattempted registration
      candidate.name = name.trim();
      candidate.email = email.toLowerCase().trim();
      candidate.stream = stream;
      candidate.paperSet = assignedSet;
      candidate.isVerified = true;
      await candidate.save();
    } else {
      candidate = new TalentSearchRegistration({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        mobile,
        stream,
        paperSet: assignedSet,
        isVerified: true,
        hasAttempted: false,
      });
      await candidate.save();
    }

    return res.json({
      success: true,
      candidate,
      paperSet: assignedSet,
      message: 'Registration successful! You may now begin the Level 1 Test.'
    });
  } catch (err) {
    console.error('Error in register:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 4. POST /api/talent-search/submit-test
router.post('/submit-test', async (req, res) => {
  try {
    const { candidateId, answers = {}, subjectBreakdown = {}, score = 0, tabSwitchCount = 0, timeTakenSeconds = 0 } = req.body;

    let candidate = null;
    if (candidateId) {
      candidate = await TalentSearchRegistration.findById(candidateId);
    }
    if (!candidate && req.body.mobile) {
      candidate = await TalentSearchRegistration.findOne({ mobile: normalizeMobile(req.body.mobile) });
    }

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate registration not found.' });
    }

    if (candidate.hasAttempted) {
      return res.json({
        success: true,
        alreadyAttempted: true,
        candidate,
        message: 'Test already submitted previously.'
      });
    }

    const finalScore = Math.max(0, Math.min(50, Number(score) || 0));
    const percentage = Math.round((finalScore / 50) * 100);
    // Passing criteria for Level 2: score >= 20 out of 50 (40%)
    const isQualifiedForLevel2 = finalScore >= 20;

    candidate.hasAttempted = true;
    candidate.score = finalScore;
    candidate.totalMarks = 50;
    candidate.percentage = percentage;
    candidate.isQualifiedForLevel2 = isQualifiedForLevel2;
    candidate.subjectBreakdown = subjectBreakdown;
    candidate.answers = answers;
    candidate.tabSwitchCount = tabSwitchCount;
    candidate.timeTakenSeconds = timeTakenSeconds;
    candidate.testDate = new Date();

    await candidate.save();

    return res.json({
      success: true,
      candidate,
      message: isQualifiedForLevel2
        ? 'Congratulations! You have successfully qualified for the Level 2 Test.'
        : 'Level 1 Test completed. Thank you for participating.'
    });
  } catch (err) {
    console.error('Error in submit-test:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 5. GET /api/talent-search/candidate/:mobile
router.get('/candidate/:mobile', async (req, res) => {
  try {
    const mobile = normalizeMobile(req.params.mobile);
    const candidate = await TalentSearchRegistration.findOne({ mobile });
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'No registration found for this mobile number.' });
    }
    return res.json({ success: true, candidate });
  } catch (err) {
    console.error('Error in get candidate:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 6. GET /api/talent-search/all-results (Leaderboard / Admin summary)
router.get('/all-results', async (req, res) => {
  try {
    const results = await TalentSearchRegistration.find(
      { hasAttempted: true },
      { name: 1, email: 1, mobile: 1, stream: 1, paperSet: 1, score: 1, percentage: 1, isQualifiedForLevel2: 1, testDate: 1 }
    ).sort({ score: -1, testDate: -1 });

    return res.json({ success: true, results });
  } catch (err) {
    console.error('Error in all-results:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
