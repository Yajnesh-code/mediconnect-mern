import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa'; // Using react-icons for a nice icon
import '../styles/donorSearch.css';

// --- Data for the new Blood Compatibility Chart ---
const bloodCompatibility = {
  'A+': { receives: ['A+', 'A-', 'O+', 'O-'], donates: ['A+', 'AB+'] },
  'A-': { receives: ['A-', 'O-'], donates: ['A+', 'A-', 'AB+', 'AB-'] },
  'B+': { receives: ['B+', 'B-', 'O+', 'O-'], donates: ['B+', 'AB+'] },
  'B-': { receives: ['B-', 'O-'], donates: ['B+', 'B-', 'AB+', 'AB-'] },
  'AB+': { receives: ['Everyone'], donates: ['AB+'] },
  'AB-': { receives: ['AB-', 'A-', 'B-', 'O-'], donates: ['AB+', 'AB-'] },
  'O+': { receives: ['O+', 'O-'], donates: ['O+', 'A+', 'B+', 'AB+'] },
  'O-': { receives: ['O-'], donates: ['Everyone'] },
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorSearch = () => {
  const [needBloodGroup, setNeedBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);
  const [userBloodGroup, setUserBloodGroup] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the compatibility modal

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/api/donors';
        if (needBloodGroup) url += `?bloodGroup=${encodeURIComponent(needBloodGroup)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch donors');

        const data = await res.json();
        setDonors(data);
      } catch (err) {
        console.error(err);
        setMessage('Error fetching donors. Please try again later.');
        setMessageType('error');
        setDonors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [needBloodGroup]);

  const handleAddDonor = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!token) {
      setMessage('You must be logged in to register as a donor.');
      setMessageType('error');
      return;
    }
    if (!userBloodGroup) {
      setMessage('Please select your blood group.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/donors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          bloodGroup: userBloodGroup,
          contact,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('You are now registered as a donor. Thank you!');
        setMessageType('success');
        setUserBloodGroup('');
        setContact('');
        setNeedBloodGroup(userBloodGroup);
      } else {
        setMessage(data.message || 'Failed to add donor');
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('Network error. Please try again.');
      setMessageType('error');
    }
  };

  if (!user) {
    return (
      <div className="donor-search-container">
        <div className="card">
            <p>Please <a href="/login">login</a> to view donors or to register as a blood donor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donor-search-container">
      <div className="header">
        <h2>Find & Register as a Blood Donor</h2>
        <button onClick={() => setIsModalOpen(true)} className="compatibility-btn">
          <FaInfoCircle /> Blood Compatibility Chart
        </button>
      </div>

      <div className="content-grid">
        <div className="card">
          <h3>Find Donors</h3>
          <div className="form-group">
            <label>Select Required Blood Group:</label>
            <select value={needBloodGroup} onChange={(e) => setNeedBloodGroup(e.target.value)}>
              <option value="">-- Show All --</option>
              {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
        </div>

        <div className="card">
          <h3>Register as a Donor</h3>
          <form onSubmit={handleAddDonor} className="donor-form">
            <div className="form-group">
              <label>Your Blood Group:</label>
              <select required value={userBloodGroup} onChange={(e) => setUserBloodGroup(e.target.value)}>
                <option value="">Select your blood group</option>
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Contact Info (optional):</label>
              <input
                type="text"
                placeholder="Phone or Email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-btn">Register as Donor</button>
          </form>
        </div>
      </div>

      {message && <p className={`message ${messageType}`}>{message}</p>}

      <div className="card">
        <h3>Available Donors</h3>
        {loading ? (
          <p>Loading donors...</p>
        ) : (
          <ul className="donor-list">
            {donors.length === 0 ? (
              <li className="donor-item no-donors">No donors found for this blood group.</li>
            ) : (
              donors.map((donor) => (
                <li key={donor._id} className="donor-item">
                  <span className="donor-blood-group">{donor.bloodGroup}</span>
                  <span className="donor-name">{donor.fullName || 'Unknown'}</span>
                  <span className="donor-contact">{donor.contact}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* --- Blood Compatibility Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">
              <FaTimes />
            </button>
            <h3>Blood Type Compatibility</h3>
            <div className="compatibility-chart">
                {Object.entries(bloodCompatibility).map(([group, compat]) => (
                    <div key={group} className="compat-item">
                        <div className="compat-group"><strong>{group}</strong></div>
                        <div className="compat-details">
                            <p><strong>Can Donate To:</strong> {compat.donates.join(', ')}</p>
                            <p><strong>Can Receive From:</strong> {compat.receives.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorSearch;