const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor'); // your Donor model
const User = require('../models/User');

// GET /api/donors?bloodGroup=...
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.bloodGroup) filter.bloodGroup = req.query.bloodGroup;
    const donors = await Donor.find(filter);
    res.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ message: 'Server error fetching donors' });
  }
});

// POST /api/donors/add
router.post('/add', async (req, res) => {
  try {
    const { userId, bloodGroup, contact } = req.body;
    if (!userId || !bloodGroup) return res.status(400).json({ message: 'User ID and blood group required' });

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'Invalid user' });

    // Save donor record
    const donor = new Donor({
      fullName: user.fullName,
      bloodGroup,
      contact,
      userId,
    });

    await donor.save();
    res.status(201).json({ message: 'Donor added successfully' });
  } catch (error) {
    console.error('Error adding donor:', error);
    res.status(500).json({ message: 'Server error adding donor' });
  }
});

module.exports = router;
