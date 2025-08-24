const Doctor = require('../models/Doctor');

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get doctor availability
exports.getDoctorAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor.availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add availability
exports.addAvailability = async (req, res) => {
  try {
    const { date, slots } = req.body;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.availability.push({ date, slots });
    await doctor.save();

    res.json({ message: "Availability added", availability: doctor.availability });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
