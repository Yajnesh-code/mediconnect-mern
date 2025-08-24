import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // State to hold the parsed user object from localStorage
  const [user, setUser] = useState(null);

  // This effect runs when the component loads or the URL changes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // Parse the JSON string from localStorage to get the user object
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]); // Re-check user status on every navigation

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    // Clear all session data and redirect to login
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Also remove the auth token
    setUser(null);
    navigate('/login');
  };

  // If on login/register page, render a minimal navbar
  if (isAuthPage) {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">MediConnect</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MediConnect</Link>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/donorsearch">Find Donors</Link></li>
            <li><Link to="/pharmacysearch">Pharmacy</Link></li>
            <li><Link to="/medicines">Medicines</Link></li>
            
            {/* ✅ FIXED: The profile link is now dynamic using the user's ID */}
            <li><Link to={`/profile/${user.id}`}>Profile</Link></li>
            
            <li>
              <Link to="/cart" className="cart-link">
                <FaShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
