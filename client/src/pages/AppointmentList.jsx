import { useEffect, useState } from "react";
import "../styles/appointmentList.css";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: "", time: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (!res.ok) throw new Error("Failed to cancel appointment.");

      const updatedAppointment = await res.json();
      setAppointments(
        appointments.map((app) =>
          app._id === appointmentId ? updatedAppointment : app
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setEditFormData({
      date: new Date(appointment.date).toISOString().split("T")[0],
      time: appointment.time,
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingAppointment) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${editingAppointment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      if (!res.ok) throw new Error("Failed to update appointment.");

      const updatedAppointment = await res.json();
      setAppointments(
        appointments.map((app) =>
          app._id === editingAppointment._id ? updatedAppointment : app
        )
      );
      setEditingAppointment(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="appointment-list-container">
      <h2 className="appointment-title">📅 My Appointments</h2>
      <div className="appointment-list">
        {appointments.length === 0 ? (
          <p className="no-appointments">No appointments booked yet.</p>
        ) : (
          appointments.map((a) => (
            <div key={a._id} className="appointment-card">
              {a.doctorId?.profileImage && (
                <img
                  src={a.doctorId.profileImage}
                  alt={a.doctorId.fullName}
                  className="doctor-img"
                />
              )}
              <div className="appointment-info">
                <h3>{a.doctorId?.fullName || "Doctor"}</h3>
                <p><strong>Specialization:</strong> {a.doctorId?.specialization}</p>
                <p><strong>Patient:</strong> {a.patientName}</p>
                <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
                {a.time && <p><strong>Time:</strong> {a.time}</p>}
                {a.reason && <p><strong>Reason:</strong> {a.reason}</p>}
                <p className={`status ${a.status}`}>
                  <strong>Status:</strong> {a.status}
                </p>

                {a.status === "Scheduled" && (
                  <div className="action-buttons">
                    <button onClick={() => handleEditClick(a)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleCancel(a._id)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {editingAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Reschedule Appointment</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <label htmlFor="date">New Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">New Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={editFormData.time}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">Save Changes</button>
                <button type="button" onClick={() => setEditingAppointment(null)} className="btn-close">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}