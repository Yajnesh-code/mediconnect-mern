import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Reusing the new register styles for a consistent look
import '../styles/register.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      // ✅ FIXED: Save both the token and user object to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ FIXED: Navigate to the user's specific profile page using their ID
      navigate(`/profile/${data.user.id}`);

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        <h2 className="register-title">Welcome Back</h2>
        <p className="register-subtitle">Log in to continue your journey.</p>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" type="email" placeholder="you@example.com"
              required value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" type="password" placeholder="••••••••"
              required value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-btn">Log In</button>
        </form>
        <p className="login-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
