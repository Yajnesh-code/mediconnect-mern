import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  // Try to get user from localStorage to create a dynamic profile link
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-col">
            <h3 className="footer-heading">MediConnect</h3>
            <p className="footer-about-text">
              Your trusted partner in health. Connecting patients with doctors, donors, and pharmacies seamlessly.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doctors">Find a Doctor</Link></li>
              <li><Link to="/appointments">Appointments</Link></li>
              <li><Link to="/donorsearch">Find a Donor</Link></li>
              {/* Dynamic profile link */}
              {user && <li><Link to={`/profile/${user.id}`}>My Profile</Link></li>}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>123 Health St, Wellness City, 12345</li>
              <li>Email: <a href="mailto:support@mediconnect.com">support@mediconnect.com</a></li>
              <li>Phone: <a href="tel:+1234567890">(123) 456-7890</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="footer-col">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MediConnect. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
