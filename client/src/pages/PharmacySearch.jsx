import React, { useState, useEffect } from 'react';
import '../styles/pharmacySearch.css';

const PharmacySearch = () => {
  const [query, setQuery] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pharmacies from backend
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pharmacies`);
        const data = await response.json();
        setPharmacies(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch pharmacies:', error);
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  // Filter based on search input
  const filtered = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(query.toLowerCase()) ||
    pharmacy.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pharmacy-search-container">
      <h2>🔍 Search Nearby Pharmacies</h2>

      <input
        type="text"
        placeholder="Search by name or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading pharmacies...</p>
      ) : (
        <div className="pharmacy-list">
          {filtered.length > 0 ? (
            filtered.map((pharmacy) => (
              <div className="pharmacy-card" key={pharmacy.id}>
                <h3>{pharmacy.name}</h3>
                <p><strong>📍 Location:</strong> {pharmacy.location}</p>
                <p><strong>📞 Phone:</strong> {pharmacy.phone}</p>
                <p><strong>🕐 Open Hours:</strong> {pharmacy.openHours}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No pharmacies found.</p>
          )}
        </div>
      )}

      <div className="map-placeholder">🗺️ Map integration coming soon...</div>
    </div>
  );
};

export default PharmacySearch;
