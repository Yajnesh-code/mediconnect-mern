// src/pages/Home.jsx
import React from 'react';
import '../styles/home.css';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section with Full Background Video */}
      <header className="hero-section">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/medic-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <h1>Welcome to MediConnect</h1>
          <p>Your all-in-one platform for healthcare solutions, appointments, and more.</p>
          <a href="#services" className="hero-btn">Explore Services</a>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <ServiceCard title="Book Appointment" description="Find doctors and schedule appointments easily." />
          <ServiceCard title="Find Blood Donors" description="Search nearby blood donors quickly and efficiently." />
          <ServiceCard title="Search Medicines" description="Explore pharmacies and search for medicines." />
          <ServiceCard title="Health Chatbot" description="Get medical advice using our smart chatbot." />
        </div>
      </section>
    </div>
  );
};

export default Home;
