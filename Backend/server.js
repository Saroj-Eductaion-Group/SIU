const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'https://sarojuniversity.edu.in'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    // Allow if matches localhost or local network IPs (e.g. 192.168.x.x, 10.x.x.x)
    const isLocal = origin.startsWith('http://localhost') || 
                    origin.startsWith('http://127.0.0.1') ||
                    /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) ||
                    /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) ||
                    /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin);
                    
    if (isLocal || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const adminRoutes = require('./routes/admin');
app.use('/api/auth', adminRoutes.router);
app.use('/api/registrations', require('./routes/registration')); // TalentHunt page (src/pages/TalentHunt.jsx)
app.use('/api/siuat', require('./routes/siuat'));               // CuetNeet portal SIUAT tab
app.use('/api/cuet', require('./routes/cuet'));                 // CUET mock test registrations
app.use('/api/neet', require('./routes/neet'));                 // NEET mock test registrations
app.use('/api/talent-search', require('./routes/talentSearch')); // Level 1 Talent Search Program (2026-27)

app.use('/api/gemini', require('./routes/gemini'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Resilient fallback connection string to support quick local setups out-of-the-box
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/siu';
const PORT = process.env.PORT || 5000;

// Start server immediately so frontend can connect even if local MongoDB is not running
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => {
    console.log('🟢 MongoDB connected successfully');
    
    // Database seeding is triggered safely AFTER mongoose connects
    adminRoutes.seedDefaultAdmin();
    adminRoutes.seedMockCandidates();
    adminRoutes.seedMockCuetNeetCandidates();
  })
  .catch(err => {
    console.warn('⚠️ MongoDB connection failed (running in offline/in-memory fallback mode):', err.message);
  });
