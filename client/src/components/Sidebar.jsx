// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar toggle button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">MediConnect</h2>
        <nav className="sidebar-links">
          <Link to="/doctors" onClick={() => setIsOpen(false)}>Doctors</Link>
          <Link to="/appointments" onClick={() => setIsOpen(false)}>Book Appointment</Link>
          <Link to="/appointment-list" onClick={() => setIsOpen(false)}>Appointment List</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
