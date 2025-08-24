const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment } = require('../controllers/appointmentController');

// POST - schedule a new appointment
router.post('/', createAppointment);

// GET - list all appointments (optionally by user or doctor)
router.get('/', getAppointments);

// PUT - update appointment (cancel/reschedule)
router.put('/:id', updateAppointment);

module.exports = router;
