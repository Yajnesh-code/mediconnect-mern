const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  experience: { type: Number, default: 0 },
  profileImage: { type: String, default: "https://via.placeholder.com/150" }, // 👈 Add image URL
  availability: [
    {
      date: { type: Date, required: true },
      slots: [{ type: String }] // e.g. ["10:00 AM", "11:00 AM"]
    }
  ],
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
