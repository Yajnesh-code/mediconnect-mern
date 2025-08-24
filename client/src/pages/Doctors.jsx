import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/card.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors") // adjust route
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="doctor-list">
      {doctors.map((doc) => (
        <div key={doc._id} className="doctor-card">
          <img src={doc.profileImage} alt={doc.fullName} className="doctor-img" />
          <h3>{doc.fullName}</h3>
          <p><b>Specialization:</b> {doc.specialization}</p>
          <p><b>Experience:</b> {doc.experience} yrs</p>
          <p><b>Status:</b> {doc.status}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
