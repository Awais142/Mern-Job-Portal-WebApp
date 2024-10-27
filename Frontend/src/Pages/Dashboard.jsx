import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaLock,
  FaSignOutAlt,
  FaBriefcase,
  FaClipboardList,
} from "react-icons/fa";
import useLoginStore from "../Store/userStore/loginStore";

const Dashboard = () => {
  const { user, role, logout, isAuthenticated } = useLoginStore(); // Use context/store for auth
  const [selectedSection, setSelectedSection] = useState("profile"); // Track active section

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const employerLinks = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "update-profile", label: "Update Profile", icon: <FaEdit /> },
    { id: "update-password", label: "Update Password", icon: <FaLock /> },
    { id: "post-job", label: "Post New Job", icon: <FaBriefcase /> },
    { id: "my-jobs", label: "My Jobs", icon: <FaClipboardList /> },
    { id: "applications", label: "Applications", icon: <FaClipboardList /> },
  ];

  const jobSeekerLinks = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "update-profile", label: "Update Profile", icon: <FaEdit /> },
    { id: "update-password", label: "Update Password", icon: <FaLock /> },
    {
      id: "my-applications",
      label: "My Applications",
      icon: <FaClipboardList />,
    },
  ];

  const renderLinks = role === "Employer" ? employerLinks : jobSeekerLinks;

  // Placeholder content for each section
  const renderContent = () => {
    switch (selectedSection) {
      case "profile":
        return <p>Welcome to your profile page, {user?.name}!</p>;
      case "update-profile":
        return <p>Here you can update your profile information.</p>;
      case "update-password":
        return <p>Update your password here.</p>;
      case "post-job":
        return <p>Post a new job listing here.</p>;
      case "my-jobs":
        return <p>Manage your job listings here.</p>;
      case "applications":
        return <p>View applications for your posted jobs here.</p>;
      case "my-applications":
        return <p>View your job applications here.</p>;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-12">
      {/* Sidebar (25% width) */}
      <aside className="w-1/4 bg-gray-300 text-black poppins-regular p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          {renderLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setSelectedSection(link.id)}
              className={`flex items-center px-4 py-2 rounded w-full text-left ${
                selectedSection === link.id
                  ? "bg-gray-400"
                  : "hover:bg-gray-400"
              }`}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </button>
          ))}
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 mt-6 text-gray-900 hover:bg-gray-400 rounded w-full text-left"
          >
            <FaSignOutAlt />
            <span className="ml-2">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content (50% width) */}
      <main className="flex-grow bg-white p-6">
        <div className="text-gray-700 p-6 border border-gray-200 rounded-lg shadow-lg">
          {/* Render content based on selected section */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
