import { useState, useEffect } from "react";
import "../styles/appointments.css";

export default function Appointments() {
  const [form, setForm] = useState({
    name: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch available doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        // Optional: fallback data in case the API is down
        setDoctors([
          { _id: "d1", fullName: "Dr. Arjun Sharma", specialization: "Cardiologist" },
          { _id: "d2", fullName: "Dr. Meera Nair", specialization: "Pediatrician" },
          { _id: "d3", fullName: "Dr. Rajesh Rao", specialization: "Orthopedic" },
        ]);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors before submitting
    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Check if the server response was successful
      if (!res.ok) {
        // Get error message from server and throw an error
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to book appointment");
      }

      const data = await res.json();
      setSuccess(true);
      console.log("Appointment booked:", data);

      // Reset form to initial state
      setForm({ name: "", doctorId: "", date: "", time: "", reason: "" });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("❌ Error booking appointment:", err);
      setError(err.message); // Set the error message to display to the user
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-heading">Book an Appointment</h2>

      {success && (
        <div className="success-message">🎉 Appointment booked successfully!</div>
      )}
      
      {/* Display error message if it exists */}
      {error && <div className="error-message">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="appointment-form">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.fullName} - {doc.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for Appointment"
          value={form.reason}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}