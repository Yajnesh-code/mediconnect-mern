const express = require('express');
const router = express.Router();

// Sample pharmacy data
const pharmacies = [
  {
    id: 1,
    name: 'Apollo Pharmacy',
    location: 'MG Road, Bengaluru',
    phone: '080-12345678',
    openHours: '9 AM - 10 PM',
  },
  {
    id: 2,
    name: 'MedPlus',
    location: 'BTM Layout, Bengaluru',
    phone: '080-87654321',
    openHours: '8 AM - 11 PM',
  },
  {
    id: 3,
    name: 'Netmeds Store',
    location: 'Indiranagar, Bengaluru',
    phone: '080-33445566',
    openHours: '24 Hours',
  },
];

// Route to get all pharmacies
router.get('/', (req, res) => {
  res.json(pharmacies);
});

module.exports = router;
