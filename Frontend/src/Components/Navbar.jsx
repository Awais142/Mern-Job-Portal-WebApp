import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 w-full p-4 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto poppins-semibold">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-gray-800">MyLogo</div>

        {/* Hamburger Icon for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-gray-800 text-2xl" />
          </button>
        </div>

        {/* Center Links - Desktop View */}
        <ul className="hidden md:flex space-x-8 text-gray-700">
          {["Home", "Jobs", "About Us"].map((link) => (
            <li key={link} className="relative group">
              <a href="#" className="hover:text-gray-900">
                {link}
              </a>
              <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </li>
          ))}
        </ul>

        {/* Right: Sign In and Employer/Post a Job */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="hover:text-gray-900 py-2 px-4 transition-all duration-300 underline-offset-2 relative group"
          >
            Sign Up / Login
            <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="#"
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 relative group"
          >
            Employer / Post a Job
            <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg p-4 space-y-4 text-gray-800">
            {["Home", "Jobs", "About Us"].map((link) => (
              <li key={link}>
                <a href="#" className="block text-lg">
                  {link}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="block py-2 px-4 bg-gray-100 rounded-md">
                Sign Up / Login
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 text-white rounded-md">
                Employer / Post a Job
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
