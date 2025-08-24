const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // UPDATED: Changed patientId to store the name directly as a string
  patientName: { type: String, required: true }, 
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  // ADDED: A field for the reason, as collected in the form
  reason: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ['Scheduled', 'Completed', 'Cancelled'], 
    default: 'Scheduled' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);