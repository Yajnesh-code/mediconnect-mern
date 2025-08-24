const Appointment = require('../models/Appointment');

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    // UPDATED: Destructure the correct fields from req.body
    const { name: patientName, doctorId, date, time, reason } = req.body;

    // Create a new appointment with the correct data
    const newAppointment = new Appointment({ patientName, doctorId, date, time, reason });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment scheduled successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments (can filter by patient or doctor)
exports.getAppointments = async (req, res) => {
  try {
    const { patientId, doctorId } = req.query;
    let filter = {};

    if (patientId) filter.patientId = patientId; // This filter might need adjustment if used
    if (doctorId) filter.doctorId = doctorId;

    // UPDATED: Remove 'patientId' from populate as it's now a string
    const appointments = await Appointment.find(filter).populate('doctorId', 'fullName email specialization profileImage');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update appointment (cancel/reschedule) - no changes needed here
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find, update, and THEN populate the document before sending it back
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true })
      .populate('doctorId', 'fullName specialization profileImage'); // ✅ ADD THIS LINE

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};