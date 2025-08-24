const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_that_is_long_and_random';

router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { fullName, username, bio, email, password, bloodGroup } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already registered' });
    user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'Username already taken' });

    const newUser = new User({
      fullName, username, bio, email, password, bloodGroup,
    });

    if (req.file) {
      newUser.profileImage = `/uploads/${req.file.filename}`;
    }

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage,
                bloodGroup: user.bloodGroup
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

router.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
