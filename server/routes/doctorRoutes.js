const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorAvailability, addAvailability } = require('../controllers/doctorController');

// GET - fetch all doctors
router.get('/', getDoctors);

// GET - fetch doctor’s available slots
router.get('/:id/availability', getDoctorAvailability);

// PUT - doctor adds availability
router.put('/:id/availability', addAvailability);

module.exports = router;
