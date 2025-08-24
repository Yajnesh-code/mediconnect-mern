import React, { useState, useEffect } from 'react';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState('');
  
  // In a real app, you would get the doctor's ID from authentication
  const doctorId = "YOUR_DOCTOR_ID"; // Replace with a real ID from your database for testing

  useEffect(() => {
    // Fetch the doctor's current data, including availability
    const fetchDoctor = async () => {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`); // Note: you may need to create this route
      const data = await response.json();
      setDoctor(data);
      setAvailability(data.availability);
    };
    // You would ideally create a GET /api/doctors/:id route for this
    // fetchDoctor();
  }, [doctorId]);

  const handleTimeChange = (day, field, value) => {
    setAvailability(current => 
      current.map(d => d.day === day ? { ...d, [field]: value } : d)
    );
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}/availability`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availability }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Manage Your Availability</h2>
      {availability.map(day => (
        <div key={day.day}>
          <h3>{day.day}</h3>
          <label>Start Time:</label>
          <input 
            type="time" 
            value={day.startTime}
            onChange={(e) => handleTimeChange(day.day, 'startTime', e.target.value)} 
          />
          <label>End Time:</label>
          <input 
            type="time" 
            value={day.endTime}
            onChange={(e) => handleTimeChange(day.day, 'endTime', e.target.value)} 
          />
        </div>
      ))}
      <button onClick={handleSave}>Save Changes</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DoctorDashboard;