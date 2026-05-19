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
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', require('./routes/admin'));
app.use('/api/registrations', require('./routes/registration')); // TalentHunt page (src/pages/TalentHunt.jsx)
app.use('/api/siuat', require('./routes/siuat'));               // CuetNeet portal SIUAT tab
app.use('/api/cuet', require('./routes/cuet'));                 // CUET mock test registrations

app.get('/health', (req, res) => res.json({ status: 'ok' }));

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('MongoDB error:', err));
