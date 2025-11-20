import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";

import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
