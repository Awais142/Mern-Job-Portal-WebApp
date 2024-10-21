import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/JobsDetail";

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

          {/* Add other routes here if needed */}
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
