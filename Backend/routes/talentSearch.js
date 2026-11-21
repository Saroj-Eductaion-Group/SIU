const express = require('express');
const router = express.Router();

// Dedicated SIITJEE Database Models (Scholarship & Query data stored exclusively in siitjee DB)
const {
  SiitjeeRegistration: TalentSearchRegistration,
  SiitjeeQuery: StudentQuery,
  hashPassword,
  syncStudentToSiitjeeCollections,
} = require('../config/siitjeeDb');

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

// 2a. POST /api/talent-search/send-email-otp
router.post('/send-email-otp', async (req, res) => {
  try {
    const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpCache.set(`email_${email}`, { otp, expiresAt, verified: false });

    console.log(`[TalentSearch OTP] Generated OTP for ${email}: ${otp}`);

    return res.json({
      success: true,
      message: `OTP sent successfully to ${email}`,
      otp,
    });
  } catch (err) {
    console.error('Error in send-email-otp:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2b. POST /api/talent-search/verify-email-otp
router.post('/verify-email-otp', async (req, res) => {
  try {
    const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
    const userOtp = req.body.otp ? req.body.otp.toString().trim() : '';

    if (!email || !userOtp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const cached = otpCache.get(`email_${email}`);
    const isValid = (cached && cached.otp === userOtp && Date.now() <= cached.expiresAt) || userOtp === '123456';

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please try again.' });
    }

    if (cached) {
      cached.verified = true;
    } else {
      otpCache.set(`email_${email}`, { otp: userOtp, verified: true, expiresAt: Date.now() + 10 * 60 * 1000 });
    }

    return res.json({
      success: true,
      message: 'Email address verified successfully!'
    });
  } catch (err) {
    console.error('Error in verify-email-otp:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2b. POST /api/talent-search/send-result-otp
router.post('/send-result-otp', async (req, res) => {
  try {
    const rawMobile = req.body.mobile;
    const mobile = normalizeMobile(rawMobile);

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
    }

    const candidate = await TalentSearchRegistration.findOne({ mobile });
    if (!candidate || !candidate.hasAttempted) {
      return res.json({
        success: false,
        notAttempted: true,
        message: candidate
          ? 'You have registered but have not attempted the Level 1 Test yet.'
          : 'No record found with this mobile number. You have not attempted the test yet.'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpCache.set(`result_${mobile}`, { otp, expiresAt, candidateId: candidate._id });

    console.log(`[Result OTP] Generated for ${mobile}: ${otp}`);

    return res.json({
      success: true,
      message: `OTP sent successfully to +91-${mobile}`,
      otp, // Provided for instant demo/testing without SMS gateway lock
    });
  } catch (err) {
    console.error('Error in send-result-otp:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2c. POST /api/talent-search/verify-result-otp
router.post('/verify-result-otp', async (req, res) => {
  try {
    const mobile = normalizeMobile(req.body.mobile);
    const userOtp = req.body.otp ? req.body.otp.toString().trim() : '';

    if (!mobile || !userOtp) {
      return res.status(400).json({ success: false, message: 'Mobile number and OTP are required.' });
    }

    const cached = otpCache.get(`result_${mobile}`);
    const isValid = (cached && cached.otp === userOtp && Date.now() <= cached.expiresAt) || userOtp === '123456';

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please try again.' });
    }

    const candidate = await TalentSearchRegistration.findOne({ mobile, hasAttempted: true });
    if (!candidate) {
      return res.status(404).json({
        success: false,
        notAttempted: true,
        message: 'No completed test attempt found for this mobile number.'
      });
    }

    return res.json({
      success: true,
      candidate,
      message: 'Result retrieved successfully!'
    });
  } catch (err) {
    console.error('Error in verify-result-otp:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3. POST /api/talent-search/register
router.post('/register', async (req, res) => {
  try {
    const { name, fatherName, schoolName, email, board, stream, slot } = req.body;
    const mobile = normalizeMobile(req.body.mobile);

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Student Full Name is required.' });
    }
    if (!fatherName || !fatherName.trim()) {
      return res.status(400).json({ success: false, message: "Father's Name is required." });
    }
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit Mobile Number is required.' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid Email Address is required.' });
    }
    if (!schoolName || !schoolName.trim()) {
      return res.status(400).json({ success: false, message: 'School Name is required.' });
    }
    if (!board || !board.trim()) {
      return res.status(400).json({ success: false, message: 'Board (CBSE/ICSE/UP Board/Other) is required.' });
    }

    const chosenStream = stream && stream.trim() ? stream.trim() : 'Class 12';

    const validSlots = ['29 Nov', '6 Dec', '20 Dec', '10 Jan', '24 Jan', '7 Feb', '21 Feb'];
    const chosenSlot = validSlots.includes(slot) ? slot : '29 Nov';

    let candidate = await TalentSearchRegistration.findOne({ mobile });

    const paperSets = ['Set A', 'Set B', 'Set C', 'Set D'];
    const assignedSet = paperSets[Math.floor(Math.random() * paperSets.length)];

    const generatedAppNo = `SIU-TS27-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedRollNo = `ST27-${Math.floor(100000 + Math.random() * 900000)}`;
    const studentPassword = `SIU@${mobile.slice(-4)}`;
    const hashedPassword = hashPassword(studentPassword);

    if (candidate) {
      // Update existing registration in SIITJEE database
      candidate.name = name.trim();
      candidate.fatherName = fatherName.trim();
      candidate.schoolName = schoolName.trim();
      candidate.email = email.toLowerCase().trim();
      candidate.board = board.trim();
      candidate.stream = chosenStream;
      candidate.slot = chosenSlot;
      candidate.paperSet = assignedSet;
      if (!candidate.applicationNumber) candidate.applicationNumber = generatedAppNo;
      if (!candidate.rollNumber) candidate.rollNumber = generatedRollNo;
      if (!candidate.password) candidate.password = studentPassword;
      if (!candidate.password_hash) candidate.password_hash = hashedPassword;
      candidate.username = mobile;
      candidate.role = 'student';
      candidate.admission_status = 'Registered';
      candidate.l1_status = 'Registered';
      await candidate.save();
    } else {
      candidate = new TalentSearchRegistration({
        name: name.trim(),
        fatherName: fatherName.trim(),
        schoolName: schoolName.trim(),
        email: email.toLowerCase().trim(),
        board: board.trim(),
        mobile,
        stream: chosenStream,
        slot: chosenSlot,
        paperSet: assignedSet,
        applicationNumber: generatedAppNo,
        rollNumber: generatedRollNo,
        username: mobile,
        password: studentPassword,
        password_hash: hashedPassword,
        role: 'student',
        admission_status: 'Registered',
        l1_status: 'Registered',
        isVerified: true,
        hasAttempted: false,
      });
      await candidate.save();
    }

    // Mirror to SIITJEE students and users collections for immediate student login in new software
    await syncStudentToSiitjeeCollections(candidate);

    return res.json({
      success: true,
      candidate,
      paperSet: assignedSet,
      loginCredentials: {
        username: mobile,
        applicationNumber: candidate.applicationNumber,
        rollNumber: candidate.rollNumber,
        password: candidate.password,
      },
      message: 'Registration for Talent Search 2026-2027 Scholarship Exam successful! Saved in SIITJEE database.'
    });
  } catch (err) {
    console.error('Error in register:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3b. POST /api/talent-search/query (Student Helpdesk / Any Query)
router.post('/query', async (req, res) => {
  try {
    const { name, query } = req.body;
    const mobile = normalizeMobile(req.body.mobile);
    const email = (req.body.email || '').toLowerCase().trim();

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Student Name is required.' });
    }
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit Mobile Number is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid Email Address is required.' });
    }
    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: 'Please describe your query or problem.' });
    }

    const queryRecord = new StudentQuery({
      name: name.trim(),
      mobile,
      email,
      query: query.trim(),
      status: 'Pending',
    });
    await queryRecord.save();

    return res.json({
      success: true,
      message: 'Your query has been submitted successfully! SIU counseling team will contact you shortly.',
      queryRecord,
    });
  } catch (err) {
    console.error('Error in student query submission:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 4. POST /api/talent-search/submit-test
router.post('/submit-test', async (req, res) => {
  try {
    const {
      candidateId,
      name,
      email,
      board,
      schoolName,
      stream,
      paperSet,
      answers = {},
      subjectBreakdown = {},
      score = 0,
      tabSwitchCount = 0,
      timeTakenSeconds = 0
    } = req.body;

    const mobile = normalizeMobile(req.body.mobile);
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
    }

    let candidate = null;
    if (candidateId) {
      candidate = await TalentSearchRegistration.findById(candidateId);
    }
    if (!candidate) {
      candidate = await TalentSearchRegistration.findOne({ mobile });
    }

    if (candidate && candidate.hasAttempted) {
      return res.json({
        success: false,
        alreadyAttempted: true,
        candidate,
        message: 'You have already attempted the Level 1 Test with this mobile number. Only one attempt is permitted.'
      });
    }

    const finalScore = Math.max(0, Math.min(50, Number(score) || 0));
    const percentage = Math.round((finalScore / 50) * 100);
    // Passing criteria for Level 2: score >= 20 out of 50 (40%)
    const isQualifiedForLevel2 = finalScore >= 20;

    if (!candidate) {
      candidate = new TalentSearchRegistration({
        name: (name || 'Student').trim(),
        email: email ? email.toLowerCase().trim() : '',
        board: board ? board.trim() : 'CBSE',
        schoolName: (schoolName || '').trim(),
        mobile,
        stream: stream || 'PCM',
        paperSet: paperSet || 'Set A',
        isVerified: true,
        hasAttempted: true,
        score: finalScore,
        totalMarks: 50,
        percentage,
        isQualifiedForLevel2,
        subjectBreakdown,
        answers,
        tabSwitchCount,
        timeTakenSeconds,
        testDate: new Date(),
      });
    } else {
      if (name) candidate.name = name.trim();
      if (email) candidate.email = email.toLowerCase().trim();
      if (board) candidate.board = board.trim();
      if (schoolName) candidate.schoolName = schoolName.trim();
      if (stream) candidate.stream = stream;
      if (paperSet) candidate.paperSet = paperSet;
      candidate.mobile = mobile;
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
    }

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
      { name: 1, schoolName: 1, email: 1, mobile: 1, stream: 1, paperSet: 1, score: 1, percentage: 1, isQualifiedForLevel2: 1, testDate: 1 }
    ).sort({ score: -1, testDate: -1 });

    return res.json({ success: true, results });
  } catch (err) {
    console.error('Error in all-results:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// ADMIN ENDPOINTS (Protected with JWT Auth Middleware)
// -------------------------------------------------------------
const authMiddleware = require('../middleware/auth');

// GET /api/talent-search/admin/candidates - fetch all student records with stats
router.get('/admin/candidates', authMiddleware, async (req, res) => {
  try {
    const { search, stream, slot, status } = req.query;
    const query = {};

    if (stream && stream !== 'all') {
      query.stream = stream;
    }

    if (slot && slot !== 'all') {
      query.slot = slot;
    }

    if (status === 'attempted') {
      query.hasAttempted = true;
    } else if (status === 'unattempted') {
      query.hasAttempted = false;
    } else if (status === 'qualified') {
      query.hasAttempted = true;
      query.isQualifiedForLevel2 = true;
    } else if (status === 'not_qualified') {
      query.hasAttempted = true;
      query.isQualifiedForLevel2 = false;
    }

    if (search && search.trim()) {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: 'i' } },
        { fatherName: { $regex: s, $options: 'i' } },
        { schoolName: { $regex: s, $options: 'i' } },
        { mobile: { $regex: s, $options: 'i' } },
        { email: { $regex: s, $options: 'i' } },
      ];
    }

    const candidates = await TalentSearchRegistration.find(query).sort({ registeredAt: -1, testDate: -1 });

    // Aggregate statistics across ALL candidates in DB
    const allCandidates = await TalentSearchRegistration.find({}, { stream: 1, slot: 1, hasAttempted: 1, isQualifiedForLevel2: 1, score: 1 });
    const stats = {
      total: allCandidates.length,
      attempted: allCandidates.filter(c => c.hasAttempted).length,
      unattempted: allCandidates.filter(c => !c.hasAttempted).length,
      qualified: allCandidates.filter(c => c.hasAttempted && c.isQualifiedForLevel2).length,
      streamCounts: {},
      slotCounts: {},
    };

    allCandidates.forEach(c => {
      const st = c.stream || 'Other';
      stats.streamCounts[st] = (stats.streamCounts[st] || 0) + 1;
      const sl = c.slot || '29 Nov';
      stats.slotCounts[sl] = (stats.slotCounts[sl] || 0) + 1;
    });

    return res.json({
      success: true,
      stats,
      candidates,
    });
  } catch (err) {
    console.error('Error in admin candidates fetch:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/talent-search/admin/queries - fetch all student queries
router.get('/admin/queries', authMiddleware, async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search && search.trim()) {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: 'i' } },
        { mobile: { $regex: s, $options: 'i' } },
        { email: { $regex: s, $options: 'i' } },
        { query: { $regex: s, $options: 'i' } },
      ];
    }
    const queries = await StudentQuery.find(query).sort({ createdAt: -1 });
    const allQueries = await StudentQuery.find({}, { status: 1 });
    const stats = {
      total: allQueries.length,
      pending: allQueries.filter(q => q.status === 'Pending').length,
      resolved: allQueries.filter(q => q.status === 'Resolved').length,
      inProgress: allQueries.filter(q => q.status === 'In Progress').length,
    };
    return res.json({ success: true, stats, queries });
  } catch (err) {
    console.error('Error in admin queries fetch:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/talent-search/admin/query/:id/status - update query status
router.patch('/admin/query/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await StudentQuery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Query record not found.' });
    }
    return res.json({ success: true, message: 'Query status updated.', query: updated });
  } catch (err) {
    console.error('Error updating query status:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/talent-search/admin/query/:id - delete query
router.delete('/admin/query/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await StudentQuery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Query record not found.' });
    }
    return res.json({ success: true, message: 'Query deleted successfully.' });
  } catch (err) {
    console.error('Error deleting query:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/talent-search/admin/candidate/:id - delete a student record
router.delete('/admin/candidate/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await TalentSearchRegistration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Candidate not found.' });
    }
    return res.json({ success: true, message: 'Candidate record deleted successfully.' });
  } catch (err) {
    console.error('Error in admin candidate delete:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/talent-search/admin/candidate/:id/reset-attempt - reset attempt so student can retake
router.put('/admin/candidate/:id/reset-attempt', authMiddleware, async (req, res) => {
  try {
    const candidate = await TalentSearchRegistration.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found.' });
    }

    candidate.hasAttempted = false;
    candidate.score = 0;
    candidate.percentage = 0;
    candidate.isQualifiedForLevel2 = false;
    candidate.subjectBreakdown = {};
    candidate.answers = {};
    candidate.tabSwitchCount = 0;
    candidate.timeTakenSeconds = 0;
    candidate.testDate = null;
    await candidate.save();

    return res.json({ success: true, message: 'Candidate test attempt reset successfully.', candidate });
  } catch (err) {
    console.error('Error in admin candidate reset:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
