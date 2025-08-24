import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    bloodGroup: '',
  });
  // State specifically for the selected image file
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For showing a preview
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create a temporary URL to show a preview of the selected image
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // FormData is required for sending files
    const formData = new FormData();

    // Append all text fields to the FormData object
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    // Append the image file if one was selected
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      // When sending FormData, you DO NOT set the 'Content-Type' header.
      // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/login');
      } else {
        setErrorMsg(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection.');
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Join our community and get started.</p>
        
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <form onSubmit={handleRegister} className="register-form">
          {/* Image Preview and Upload Input */}
          <div className="form-group image-upload-group">
            <label htmlFor="profileImage">Profile Picture</label>
            <div className="image-preview-container">
              <img 
                src={previewImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} 
                alt="Preview" 
                className="image-preview"
              />
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleImageChange}
                className="image-input"
              />
              <label htmlFor="profileImage" className="image-upload-label">
                Choose Image
              </label>
            </div>
          </div>

          {/* Text Inputs */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName" name="fullName" type="text" placeholder="e.g., John Doe"
              required value={userData.fullName} onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username" name="username" type="text" placeholder="e.g., johndoe99"
              required value={userData.username} onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" name="email" type="email" placeholder="you@example.com"
              required value={userData.email} onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password" placeholder="••••••••"
              required value={userData.password} onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio (Optional)</label>
            <textarea
              id="bio" name="bio" placeholder="Tell us a little about yourself..."
              value={userData.bio} onChange={handleTextChange} rows={3}
            />
          </div>
           <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group (Optional)</label>
            <input
              id="bloodGroup" name="bloodGroup" type="text" placeholder="e.g., A+, O-"
              value={userData.bloodGroup} onChange={handleTextChange}
            />
          </div>

          <button type="submit" className="register-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
