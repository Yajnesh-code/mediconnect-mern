const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

// chatbot route (CommonJS)
const chatbotRoutes = require("./routes/chatbot");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/donors', require('./routes/donorRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/pharmacies', require('./routes/pharmacyRoutes'));

app.use("/api", chatbotRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ MediConnect API Running...');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
