const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://siu_admin:VeXC80POfjzxSFIl@ac-duen7sj-shard-00-00.bwfkhxp.mongodb.net:27017,ac-duen7sj-shard-00-01.bwfkhxp.mongodb.net:27017,ac-duen7sj-shard-00-02.bwfkhxp.mongodb.net:27017/siu_talenthunt?ssl=true&replicaSet=atlas-10dyvw-shard-0&authSource=admin&retryWrites=true&w=majority";

const schema = new mongoose.Schema({
  appId:           { type: String, unique: true },
  firstName:       String,
  lastName:        String,
  email:           String,
  mobile:          String,
  dob:             String,
  gender:          String,
  city:            String,
  state:           String,
  qual:            String,
  board:           String,
  marks:           String,
  yop:             String,
  courses:         [String],
  examDate:        String,
  examMode:        String,
  centre:          String,
  medium:          String,
  category:        String,
  scholar:         String,
  source:          String,
  session:         { type: String, default: '2026-27' },
  status:          { type: String, default: 'Pending' },
  idProof:         { type: String, default: null },
  idVerified:      { type: Boolean, default: false },
  examOverride:    { type: Boolean, default: true },
  sessionToken:    { type: String, default: null },
  score:           { type: Number, default: null },
  grade:           { type: String, default: null },
  sectionData:     { type: Object, default: null },
  registeredAt:    { type: Date, default: Date.now },
});

const Registration = mongoose.model('Registration', schema);

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Database connected.');

    // Remove existing test candidate if any
    await Registration.deleteOne({ appId: 'TEST999' });

    const testUser = new Registration({
      appId: 'TEST999',
      firstName: 'Test',
      lastName: 'Candidate',
      email: 'test.candidate@sarojuniversity.edu.in',
      mobile: '9999999999',
      dob: '2008-01-01',
      gender: 'Male',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      qual: 'Class 12',
      board: 'CBSE',
      marks: '95%',
      yop: '2026',
      courses: ['B.Tech'],
      examDate: '07 Jun 2026 (Morning)',
      examMode: 'Online (CBT)',
      centre: 'Lucknow Main Campus',
      medium: 'English',
      category: 'General',
      scholar: 'Yes, very interested',
      source: 'University Website',
      status: 'Approved', // Pre-approved
      examOverride: true,  // Bypasses date schedule checks
      examCompleted: false,
      score: null,
      sessionToken: null
    });

    await testUser.save();
    console.log('Test candidate successfully created:');
    console.log('App ID: TEST999');
    console.log('Status: Approved');
    console.log('Exam Override: Enabled (Immediate testing allowed)');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
}

seed();
