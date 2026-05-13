const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  appId:           { type: String, unique: true },
  // Personal
  firstName:       String,
  lastName:        String,
  email:           String,
  mobile:          String,
  dob:             String,
  gender:          String,
  city:            String,
  state:           String,
  // Academic
  qual:            String,
  board:           String,
  marks:           String,
  yop:             String,
  // Courses
  courses:         [String],
  // Exam Preference
  examDate:        String,
  examMode:        String,
  centre:          String,
  medium:          String,
  category:        String,
  scholar:         String,
  source:          String,
  session:         { type: String, default: '2026-27' },
  // Status & Result
  status:          { type: String, default: 'Pending' },
  idProof:         { type: String, default: null }, // base64 or filename
  idVerified:      { type: Boolean, default: false },
  examOverride:    { type: Boolean, default: false },
  score:           { type: Number, default: null },
  grade:           { type: String, default: null },
  sectionData:     { type: Object, default: null },
  registeredAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model('Registration', registrationSchema);
