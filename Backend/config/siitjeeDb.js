const dns = require('dns');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Ensure reliable DNS lookups on all platforms (especially Windows)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('[SIITJEE DB] DNS server configuration notice:', e.message);
}

const SIITJEE_URI = process.env.SIITJEE_MONGO_URI ||
  'mongodb+srv://weddevraj_db_user:XiLlswMLtD2OvPpW@cluster0.pbokirl.mongodb.net/siitjee?retryWrites=true&w=majority&appName=Cluster0';

console.log('📡 Connecting to SIITJEE MongoDB Cluster for Talent Search Scholarship...');

const siitjeeConn = mongoose.createConnection(SIITJEE_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
});

siitjeeConn.on('connected', () => {
  console.log('🟢 [SIITJEE DB] Connected successfully to "siitjee" database!');
});

siitjeeConn.on('error', (err) => {
  console.error('🔴 [SIITJEE DB] Connection error:', err.message);
});

// Helper to hash password in standard format (salt:hash or hex sha256)
function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(plainPassword, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// -------------------------------------------------------------
// 1. TALENT SEARCH REGISTRATION SCHEMA (SIITJEE)
// -------------------------------------------------------------
const talentSearchRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
    default: '',
  },
  schoolName: {
    type: String,
    required: true,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    default: '',
  },
  board: {
    type: String,
    required: true,
    trim: true,
    default: 'CBSE',
  },
  slot: {
    type: String,
    required: true,
    trim: true,
    default: '29 Nov',
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  stream: {
    type: String,
    default: 'Class 12',
  },
  applicationNumber: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
  },
  rollNumber: {
    type: String,
    index: true,
  },
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    default: '',
  },
  password_hash: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'student',
  },
  admission_status: {
    type: String,
    default: 'Registered',
  },
  l1_status: {
    type: String,
    default: 'Registered',
  },
  paperSet: {
    type: String,
    default: 'Set A',
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  hasAttempted: {
    type: Boolean,
    default: false,
    index: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 50,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  isQualifiedForLevel2: {
    type: Boolean,
    default: false,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: String,
    default: () => new Date().toISOString(),
  },
}, { timestamps: true });

// -------------------------------------------------------------
// 2. STUDENT QUERY SCHEMA (SIITJEE)
// -------------------------------------------------------------
const studentQuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  query: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Compile models on the SIITJEE dedicated connection
const SiitjeeRegistration = siitjeeConn.model('TalentSearchRegistration', talentSearchRegistrationSchema, 'talentsearchregistrations');
const SiitjeeQuery = siitjeeConn.model('StudentQuery', studentQuerySchema, 'studentqueries');

// Helper to mirror student and credentials into siitjee `students` and `users` collections
async function syncStudentToSiitjeeCollections(candidate) {
  try {
    const rawDb = siitjeeConn.db;
    if (!rawDb) return;

    // 1. Mirror to `students` collection in siitjee
    const studentsCol = rawDb.collection('students');
    await studentsCol.updateOne(
      { phone: candidate.mobile },
      {
        $set: {
          name: candidate.name,
          phone: candidate.mobile,
          email: candidate.email,
          guardian_name: candidate.fatherName,
          school_name: candidate.schoolName,
          board: candidate.board,
          stream: candidate.stream,
          student_code: candidate.applicationNumber,
          roll_number: candidate.rollNumber,
          l1_date: candidate.slot,
          l1_status: 'Registered',
          login_password: candidate.password,
          admission_status: 'Registered',
          consent: 'Yes',
          consent_reference: 'SIU-TALENT-SEARCH-2026-27',
          updatedAt: new Date(),
        },
        $setOnInsert: {
          created_at: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    // 2. Mirror to `users` collection in siitjee for direct student login in new software
    const usersCol = rawDb.collection('users');
    await usersCol.updateOne(
      { username: candidate.mobile },
      {
        $set: {
          username: candidate.mobile,
          name: candidate.name,
          phone: candidate.mobile,
          password_hash: candidate.password_hash,
          plain_password: candidate.password,
          role: 'student',
          job_role: 'student',
          active: 1,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          created_at: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    console.log(`✅ [SIITJEE DB] Synced candidate ${candidate.name} (+91-${candidate.mobile}) to siitjee students & users collections.`);
  } catch (err) {
    console.warn('⚠️ [SIITJEE DB] Mirror sync notice:', err.message);
  }
}

module.exports = {
  siitjeeConn,
  SiitjeeRegistration,
  SiitjeeQuery,
  hashPassword,
  syncStudentToSiitjeeCollections,
};
