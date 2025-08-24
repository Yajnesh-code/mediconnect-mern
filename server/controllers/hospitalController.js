const hospitals = require('../data/hospitals');

exports.getHospitals = (req, res) => {
  res.json(hospitals);
};
