import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/JobsDetail";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import Settings from "./Pages/Settings";
import AboutUs from "./Pages/AboutUs";

const App = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <Navbar />

      <div className="min-h-screen">
        {/* Main Routes */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Jobs Route */}
          <Route path="/jobs" element={<Jobs />} />

          {/* Jobs Details */}
          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
