const mongoose = require('mongoose');

const talentSearchRegistrationSchema = new mongoose.Schema({
  name: {
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
  mobile: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  stream: {
    type: String,
    required: true,
    enum: ['PCM', 'PCB', 'PCM+Bio', 'Commerce', 'Arts', 'Humanities'],
  },
  paperSet: {
    type: String,
    enum: ['Set A', 'Set B', 'Set C', 'Set D'],
    default: 'Set A',
  },
  isVerified: {
    type: Boolean,
    default: false,
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
  subjectBreakdown: {
    type: Object,
    default: {},
  },
  answers: {
    type: Object,
    default: {},
  },
  tabSwitchCount: {
    type: Number,
    default: 0,
  },
  timeTakenSeconds: {
    type: Number,
    default: 0,
  },
  testDate: {
    type: Date,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TalentSearchRegistration', talentSearchRegistrationSchema);
