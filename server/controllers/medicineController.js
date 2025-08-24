const medicines = require('../data/medicines');

exports.getMedicines = (req, res) => {
  res.json(medicines);
};
