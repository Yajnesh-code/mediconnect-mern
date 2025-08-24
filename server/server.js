const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mediconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// --- ADDED: Serve static files from the 'uploads' directory ---
// This makes uploaded images accessible via URLs like 'http://localhost:5000/uploads/filename.jpg'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Static images from public folder (if needed for other assets)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));  // User login/signup
app.use('/api/doctors', require('./routes/doctorRoutes')); // Doctor CRUD + approval
app.use('/api/appointments', require('./routes/appointmentRoutes')); // Appointment booking
app.use('/api/donors', require('./routes/donorRoutes')); // Blood donor
app.use('/api/medicines', require('./routes/medicineRoutes')); // Pharmacy medicines
app.use('/api/hospitals', require('./routes/hospitalRoutes')); // Hospitals
app.use('/api/pharmacies', require('./routes/pharmacyRoutes')); // Pharmacies

// Root route
app.get('/', (req, res) => {
  res.send('✅ MediConnect API Running...');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
