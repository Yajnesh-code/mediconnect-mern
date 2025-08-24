const express = require('express');
const router = express.Router();

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    description: "Used to reduce fever and relieve mild to moderate pain.",
    price: 25,
    image: "http://localhost:5000/images/medicines/paracetamol.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    description: "Anti-inflammatory used for treating pain and swelling.",
    price: 30,
    image: "http://localhost:5000/images/medicines/ibuprofen.jpg",
    pharmacy: "MedPlus"
  },
  {
    id: 3,
    name: "Amoxicillin 250mg",
    description: "Antibiotic used to treat bacterial infections.",
    price: 50,
    image: "http://localhost:5000/images/medicines/amoxicillin.jpg",
    pharmacy: "Netmeds"
  },
  {
    id: 4,
    name: "Aspirin 75mg",
    description: "Used as a blood thinner and pain reliever.",
    price: 18,
    image: "http://localhost:5000/images/medicines/aspirin.jpg",
    pharmacy: "1mg"
  },
  {
    id: 5,
    name: "Vitamin C 500mg",
    description: "Boosts immunity and helps tissue repair.",
    price: 20,
    image: "http://localhost:5000/images/medicines/vitamin-c.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 6,
    name: "Azithromycin 500mg",
    description: "Antibiotic used for respiratory infections.",
    price: 60,
    image: "http://localhost:5000/images/medicines/azithromycin.jpg",
    pharmacy: "PharmEasy"
  },
  {
    id: 7,
    name: "Cetirizine 10mg",
    description: "Antihistamine used to relieve allergy symptoms.",
    price: 15,
    image: "http://localhost:5000/images/medicines/cetirizine.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 8,
    name: "Dolo 650",
    description: "Relieves fever and body pain.",
    price: 22,
    image: "http://localhost:5000/images/medicines/dolo.jpg",
    pharmacy: "Netmeds"
  },
  {
    id: 9,
    name: "Cough Syrup 100ml",
    description: "Soothes dry and productive coughs.",
    price: 45,
    image: "http://localhost:5000/images/medicines/cough-syrup.jpg",
    pharmacy: "PharmaOne"
  },
  {
    id: 10,
    name: "Pantoprazole 40mg",
    description: "Reduces stomach acid for ulcers and GERD.",
    price: 35,
    image: "http://localhost:5000/images/medicines/pantoprazole.jpg",
    pharmacy: "1mg"
  },
  {
    id: 11,
    name: "Calcium Tablets",
    description: "Helps in strengthening bones and teeth.",
    price: 55,
    image: "http://localhost:5000/images/medicines/calcium.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 12,
    name: "ORS Powder",
    description: "Replenishes lost electrolytes in diarrhea.",
    price: 10,
    image: "http://localhost:5000/images/medicines/ors.jpg",
    pharmacy: "MedPlus"
  },
  {
    id: 13,
    name: "Zincovit Tablets",
    description: "Multivitamin supplement for energy and immunity.",
    price: 40,
    image: "http://localhost:5000/images/medicines/zincovit.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 14,
    name: "Metformin 500mg",
    description: "Used to control blood sugar in type 2 diabetes.",
    price: 28,
    image: "http://localhost:5000/images/medicines/metformin.jpg",
    pharmacy: "Netmeds"
  },
  {
    id: 15,
    name: "Loratadine 10mg",
    description: "Non-drowsy antihistamine for allergies.",
    price: 32,
    image: "http://localhost:5000/images/medicines/loratadine.jpg",
    pharmacy: "PharmEasy"
  },
  {
    id: 16,
    name: "Thyronorm 50mcg",
    description: "Used to treat hypothyroidism.",
    price: 29,
    image: "http://localhost:5000/images/medicines/thyronorm.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 17,
    name: "Disprin",
    description: "Pain reliever and fever reducer.",
    price: 5,
    image: "http://localhost:5000/images/medicines/disprin.jpg",
    pharmacy: "MedPlus"
  },
  {
    id: 18,
    name: "Benadryl Syrup",
    description: "Relieves cough and throat irritation.",
    price: 55,
    image: "http://localhost:5000/images/medicines/benadryl.jpg",
    pharmacy: "Netmeds"
  },
  {
    id: 19,
    name: "Revital H",
    description: "Daily energy multivitamin capsule.",
    price: 95,
    image: "http://localhost:5000/images/medicines/revital.jpg",
    pharmacy: "Apollo Pharmacy"
  },
  {
    id: 20,
    name: "Montair LC",
    description: "Treats asthma and allergic rhinitis.",
    price: 80,
    image: "http://localhost:5000/images/medicines/montair.jpg",
    pharmacy: "PharmEasy"
  }
];


router.get('/', (req, res) => {
  res.json(medicines);
});

module.exports = router;
