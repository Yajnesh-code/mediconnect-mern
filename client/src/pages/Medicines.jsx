import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/medicine.css';

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/medicines')
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.error('Failed to load medicines:', err));
  }, []);

  return (
    <div className="medicine-page">
      <div className="page-header">
        <h2>🧪 Explore Medicines</h2>
      </div>

      <div className="medicine-list">
        {medicines.map((med) => (
          <div className="medicine-card" key={med._id}>
            <img src={med.image} alt={med.name} className="medicine-img" />
            <h3>{med.name}</h3>
            <p className="med-desc">{med.description}</p>
            <p><strong>💰 Price:</strong> ₹{med.price}</p>
            <p><strong>🏪 Pharmacy:</strong> {med.pharmacy}</p>
            <button className="add-btn" onClick={() => addToCart(med)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicinePage;