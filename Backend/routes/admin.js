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

const Registration = require('../models/Registration');

// Auto-seed default mock candidates if none exists (for fresh localhost environments)
const seedMockCandidates = async () => {
  try {
    const count = await Registration.countDocuments();
    if (count === 0) {
      const mockCandidates = [
        {
          appId: 'SIU120229',
          firstName: 'Diwakar',
          lastName: 'Singh',
          email: 'rajsharma74411@gmail.com',
          mobile: '8085306346',
          dob: '2005-08-15',
          gender: 'Male',
          city: 'Gwalior',
          state: 'Madhya Pradesh',
          qual: 'Diploma (Polytechnic / ITI)',
          board: 'CBSE',
          marks: '85%',
          yop: '2025',
          courses: ['B.Tech', 'M.Tech'],
          examDate: '15 Jun 2026 (Morning)',
          examMode: 'Online (CBT)',
          centre: 'Lucknow Main Campus',
          medium: 'English',
          category: 'General',
          source: 'Social Media',
          status: 'Pending',
          score: null,
          grade: null,
          registeredAt: new Date(Date.now() - 48 * 3600000)
        },
        {
          appId: 'SIU156714',
          firstName: 'Raj',
          lastName: 'Sharma',
          email: 'rajsharma74411@gmail.com',
          mobile: '8085306346',
          dob: '2004-12-20',
          gender: 'Male',
          city: 'Gwalior',
          state: 'Madhya Pradesh',
          qual: 'B.Tech / B.E',
          board: 'CBSE',
          marks: '78%',
          yop: '2026',
          courses: ['M.Tech', 'LLM'],
          examDate: '15 Jun 2026 (Morning)',
          examMode: 'Online (CBT)',
          centre: 'Lucknow Main Campus',
          medium: 'English',
          category: 'General',
          source: 'Social Media',
          status: 'Rejected',
          score: null,
          grade: null,
          registeredAt: new Date(Date.now() - 24 * 3600000)
        },
        {
          appId: 'SIU999999',
          firstName: 'Aanya',
          lastName: 'Verma',
          email: 'aanya.verma@gmail.com',
          mobile: '9876543210',
          dob: '2005-04-10',
          gender: 'Female',
          city: 'Lucknow',
          state: 'Uttar Pradesh',
          qual: 'Class 12 / Intermediate (Passed)',
          board: 'CBSE',
          marks: '92%',
          yop: '2025',
          courses: ['B.Tech', 'BCA'],
          examDate: '15 Jun 2026 (Morning)',
          examMode: 'Online (CBT)',
          centre: 'Lucknow Main Campus',
          medium: 'English',
          category: 'General',
          source: 'University Website',
          status: 'Approved',
          score: 90,
          grade: 'A+',
          registeredAt: new Date(Date.now() - 72 * 3600000)
        }
      ];
      await Registration.insertMany(mockCandidates);
      console.log('🟢 Default mock candidate registrations successfully seeded');
    }
  } catch (err) {
    console.error('❌ Failed to auto-seed mock candidates:', err.message);
  }
};

// Auto-seed course-specific test candidates if they don't exist
const seedTestCandidates = async () => {
  try {
    const candidatesToSeed = [
      { appId: 'TESTBTECH', name: 'BTech', courses: ['B.Tech'] },
      { appId: 'TESTBBA', name: 'BBA', courses: ['BBA'] },
      { appId: 'TESTBCA', name: 'BCA', courses: ['BCA'] },
      { appId: 'TESTBSC', name: 'BSc', courses: ['B.Sc'] },
      { appId: 'TESTBCOM', name: 'BCom', courses: ['B.Com'] },
      { appId: 'TESTBA', name: 'BA', courses: ['BA'] },
      { appId: 'TESTMBA', name: 'MBA', courses: ['MBA'] },
      { appId: 'TESTMTECH', name: 'MTech', courses: ['M.Tech'] },
      { appId: 'TESTMCA', name: 'MCA', courses: ['MCA'] },
      { appId: 'TESTMSC', name: 'MSc', courses: ['M.Sc'] },
      { appId: 'TESTMCOM', name: 'MCom', courses: ['M.Com'] },
      { appId: 'TESTMA', name: 'MA', courses: ['MA'] },
      { appId: 'TESTLLB', name: 'LLB', courses: ['LLB (Law)'] },
      { appId: 'TESTLLM', name: 'LLM', courses: ['LLM'] },
      { appId: 'TESTBPHARMA', name: 'BPharma', courses: ['B.Pharma'] },
      { appId: 'TESTMPHARMA', name: 'MPharma', courses: ['M.Pharma'] },
      { appId: 'TESTPHD', name: 'PhD', courses: ['PhD'] },
      { appId: 'TESTDIPLOMA', name: 'Diploma', courses: ['Diploma'] },
      { appId: 'TESTBSMS', name: 'BSMS', courses: ['BS'] }
    ];

    for (const c of candidatesToSeed) {
      const existing = await Registration.findOne({ appId: c.appId });
      if (!existing) {
        const dummy = new Registration({
          appId: c.appId,
          firstName: 'Test',
          lastName: c.name,
          email: `test.${c.name.toLowerCase()}@sarojuniversity.edu.in`,
          mobile: '99999' + String(Math.floor(10000 + Math.random() * 90000)),
          dob: '2008-01-01',
          gender: 'Male',
          city: 'Lucknow',
          state: 'Uttar Pradesh',
          qual: 'Class 12',
          board: 'CBSE',
          marks: '95%',
          yop: '2026',
          courses: c.courses,
          examDate: '07 Jun 2026 (Morning)',
          examMode: 'Online (CBT)',
          centre: 'Lucknow Main Campus',
          medium: 'English',
          category: 'General',
          scholar: 'Yes, very interested',
          source: 'University Website',
          status: 'Approved',
          examOverride: true,
          score: null,
          grade: null,
          sectionData: null,
          sessionToken: null
        });
        await dummy.save();
        console.log(`🟢 Auto-seeded course test candidate: ${c.appId}`);
      }
    }
  } catch (err) {
    console.error('❌ Failed to auto-seed course test candidates:', err.message);
  }
};

const CuetRegistration = require('../models/CuetRegistration');
const NeetRegistration = require('../models/NeetRegistration');

// Auto-seed default mock CUET/NEET candidates if none exists (for fresh localhost environments)
const seedMockCuetNeetCandidates = async () => {
  try {
    const cuetCount = await CuetRegistration.countDocuments();
    if (cuetCount === 0) {
      const mockCuet = [
        {
          cuetId: 'CUET2026111111',
          firstName: 'Aanya',
          lastName: 'Verma',
          dob: '2005-04-10',
          gender: 'Female',
          mobile: '9876543210',
          email: 'aanya.verma@gmail.com',
          city: 'Lucknow',
          state: 'Uttar Pradesh',
          qualification: 'Class 12 / Intermediate (Passed)',
          board: 'CBSE',
          marks: '92%',
          year: '2025',
          languages: ['English', 'Hindi'],
          domainSubjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
          generalTest: true,
          testCity1: 'Lucknow',
          testCity2: 'Delhi',
          testCity3: 'Varanasi',
          category: 'General',
          pwd: 'No',
          source: 'University Website',
          mockResults: [
            {
              testId: 'p1',
              correct: 12,
              wrong: 2,
              skipped: 1,
              score: 46,
              maxScore: 60,
              pct: 77,
              savedAt: new Date(Date.now() - 24 * 3600000)
            }
          ],
          registeredAt: new Date(Date.now() - 72 * 3600000)
        }
      ];
      await CuetRegistration.insertMany(mockCuet);
      console.log('🟢 Default CUET mock candidate successfully seeded (CUET2026111111)');
    }

    const neetCount = await NeetRegistration.countDocuments();
    if (neetCount === 0) {
      const mockNeet = [
        {
          neetId: 'NEET2026222222',
          firstName: 'Raj',
          lastName: 'Sharma',
          dob: '2004-12-20',
          gender: 'Male',
          mobile: '8085306346',
          email: 'rajsharma74411@gmail.com',
          city: 'Gwalior',
          state: 'Madhya Pradesh',
          qualification: 'Class 12 / Intermediate (Passed)',
          board: 'CBSE',
          marks: '78%',
          year: '2025',
          languages: ['English'],
          mockResults: [
            {
              testId: 'b1',
              correct: 14,
              wrong: 1,
              skipped: 0,
              score: 55,
              maxScore: 60,
              pct: 92,
              savedAt: new Date(Date.now() - 12 * 3600000)
            }
          ],
          registeredAt: new Date(Date.now() - 48 * 3600000)
        }
      ];
      await NeetRegistration.insertMany(mockNeet);
      console.log('🟢 Default NEET mock candidate successfully seeded (NEET2026222222)');
    }
  } catch (err) {
    console.error('❌ Failed to auto-seed mock CUET/NEET candidates:', err.message);
  }
};

module.exports = {
  router,
  seedDefaultAdmin,
  seedMockCandidates,
  seedMockCuetNeetCandidates,
  seedTestCandidates
};

