// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import DonorSearch from './pages/DonorSearch';
import PharmacySearch from './pages/PharmacySearch';
import Profile from './pages/Profile';
import Medicines from './pages/Medicines';
import CartPage from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';
import AppointmentList from "./pages/AppointmentList";
import Doctors from "./pages/Doctors";

const AppRoutes = () => {
  return (
   <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
      <Route path="/donorsearch" element={<PrivateRoute><DonorSearch /></PrivateRoute>} />
      <Route path="/pharmacysearch" element={<PrivateRoute><PharmacySearch /></PrivateRoute>} />
      <Route path="/medicines" element={<PrivateRoute><Medicines /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/appointment-list" element={<AppointmentList />} />
      
      {/* ✅ FIXED: The profile route is now dynamic and accepts a userId */}
      <Route path="/profile/:userId" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
