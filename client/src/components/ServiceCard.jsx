// src/components/ServiceCard.jsx
import React from 'react';
import '../styles/card.css';

const ServiceCard = ({ title, description }) => {
  return (
    <div className="service-card">
      <div className="card-icon">🩺</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
    </div>
  );
};

export default ServiceCard;
