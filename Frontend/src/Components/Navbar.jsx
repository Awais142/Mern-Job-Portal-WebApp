import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import useLoginStore from "../Store/userStore/loginStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout, checkAuth } = useLoginStore();
  const navigate = useNavigate();

  // Run checkAuth on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    logout();
    navigate("/");
    console.log("handle logout");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest("#dropdownBtn")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-gray-100 w-full p-4 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto poppins-semibold">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <img
            src="src/assets/images/logo.png"
            alt="logo"
            className="h-[50px] w-[120px]"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700">
          {/* Links Array */}
          {[
            { name: "Home", path: "/" },
            { name: "Jobs", path: "/jobs" },
            { name: "About Us", path: "/about-us" },
          ].map((link) => (
            <li key={link.name} className="relative group">
              <Link to={link.path} className="hover:text-gray-900">
                {link.name}
              </Link>
              <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </li>
          ))}
        </ul>

        {/* Auth and Dropdown Links */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                id="dropdownBtn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-800 hover:text-gray-900 transition-all duration-300"
              >
                <FaUser className="text-2xl" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <span className="block px-4 py-2 text-gray-700">
                    Welcome, {user?.name || "No Username"}
                  </span>
                  <span className="block px-4 py-2 text-gray-700">
                    Your are an ({user?.role || "User"})
                  </span>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-900 py-2 px-4 transition-all duration-300 underline-offset-2 relative group"
              >
                Sign Up / Login
                <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                to="/post-job"
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 relative group"
              >
                Employer / Post a Job
                <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-gray-800 text-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg p-4 space-y-4 text-gray-800">
            {/* Links Array */}
            {[
              { name: "Home", path: "/" },
              { name: "Jobs", path: "/jobs" },
              { name: "About Us", path: "/about-us" },
            ].map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="block text-lg">
                  {link.name}
                </Link>
              </li>
            ))}
            {isAuthenticated ? (
              <>
                <li>
                  <span className="block py-2">
                    Welcome, {user?.username || "User"}
                  </span>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-4 bg-gray-100 rounded-md"
                  >
                    Sign Up / Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/post-job"
                    className="block py-2 px-4 text-gray-700 rounded-md"
                  >
                    Employer / Post a Job
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
