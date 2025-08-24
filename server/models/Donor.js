const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contact: { type: String }, // optional: phone/email
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donor', donorSchema);
