import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get userId from the URL if it exists
  const { userId: userIdFromUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let targetUserId = userIdFromUrl;

    // If no ID is in the URL, try to get it from localStorage
    if (!targetUserId) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser && savedUser.id) {
        targetUserId = savedUser.id;
      }
    }
    
    // If we still don't have an ID, we can't fetch a profile
    if (!targetUserId) {
        setError("Could not determine user profile to load. Please log in.");
        setLoading(false);
        // Optional: redirect to login after a delay
        setTimeout(() => navigate('/login'), 3000);
        return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/auth/profile/${targetUserId}`);
        
        if (!res.ok) {
          throw new Error('Could not fetch user profile.');
        }

        const data = await res.json();
        // Construct the full image URL if it's a relative path
        if (data.profileImage && !data.profileImage.startsWith('http')) {
            data.profileImage = `http://localhost:5000${data.profileImage}`;
        }
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userIdFromUrl, navigate]); // Rerun if the URL param changes

  if (loading) {
    return <div className="loading-container">Loading Profile...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  if (!user) {
    return <div className="loading-container">User not found.</div>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-header">
          <img 
            src={user.profileImage} 
            alt="Profile Avatar" 
            className="profile-avatar" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
          />
          <h2 className="profile-fullname">{user.fullName}</h2>
          <p className="profile-username">@{user.username}</p>
        </div>
        <div className="profile-body">
          {user.bio && (
            <div className="profile-bio">
              <p>{user.bio}</p>
            </div>
          )}
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user.email}</span>
            </div>
            {user.bloodGroup && (
              <div className="detail-item">
                <span className="detail-label">Blood Group</span>
                <span className="detail-value">{user.bloodGroup}</span>
              </div>
            )}
             <div className="detail-item">
              <span className="detail-label">Joined</span>
              <span className="detail-value">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
