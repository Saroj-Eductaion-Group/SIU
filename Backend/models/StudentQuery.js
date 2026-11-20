const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('StudentQuery', studentQuerySchema);
