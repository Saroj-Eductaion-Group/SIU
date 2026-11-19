const mongoose = require('mongoose');

const neetRegistrationSchema = new mongoose.Schema({
  neetId:         { type: String, unique: true },
  firstName:      String,
  lastName:       String,
  dob:            String,
  gender:         String,
  mobile:         String,
  email:          String,
  city:           String,
  state:          String,
  qualification:  String,
  board:          String,
  marks:          String,
  year:           String,
  // NEET mock configurations
  languages:      [String],
  mockResults:    [{ type: Object }], // array of mock test results with score, accuracy, difficulty stats, etc.
  registeredAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('NeetRegistration', neetRegistrationSchema);
