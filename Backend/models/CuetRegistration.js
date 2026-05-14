const mongoose = require('mongoose');

const cuetRegistrationSchema = new mongoose.Schema({
  cuetId:         { type: String, unique: true },
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
  languages:      [String],
  domainSubjects: [String],
  generalTest:    { type: Boolean, default: true },
  testCity1:      String,
  testCity2:      String,
  testCity3:      String,
  category:       { type: String, default: 'General' },
  pwd:            { type: String, default: 'No' },
  source:         String,
  // Mock test results stored as array
  mockResults:    [{ type: Object }],
  registeredAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('CuetRegistration', cuetRegistrationSchema);
