import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if user info exists in localStorage (means logged in)
  const user = localStorage.getItem('user');

  // If user exists, render the requested page (children)
  // Else redirect to login page
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
