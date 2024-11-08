import React, { useState } from "react";
import { FaUser, FaEdit, FaLock, FaClipboardList } from "react-icons/fa";
import Profile from "../Components/Profile";
import UpdateProfile from "../Components/UpdateProfile";
import UpdatePasswordComponent from "../Components/UpdatePasswordComponent";

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("profile");

  const links = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "update-profile", label: "Update Profile", icon: <FaEdit /> },
    { id: "update-password", label: "Update Password", icon: <FaLock /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 mt-12">
      {/* Sidebar (25% width) */}
      <div className="aside flex-grow bg-white p-6 w-1/4">
        <aside className="bg-white text-black poppins-regular p-6 border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Settings</h2>
          <nav className="space-y-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => setSelectedSection(link.id)}
                className={`flex items-center px-4 py-2 rounded w-full text-left ${
                  selectedSection === link.id
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      </div>
      {/* Main Content (75% width) */}
      <main className="flex-grow bg-white p-6 w-3/4">
        <div className="text-gray-700 p-6 border border-gray-200 rounded-lg shadow-lg poppins-regular">
          {/* Conditionally render the content based on the selected section */}
          {selectedSection === "profile" && <Profile />}
          {selectedSection === "update-profile" && <UpdateProfile />}
          {selectedSection === "update-password" && <UpdatePasswordComponent />}
        </div>
      </main>
    </div>
  );
};

export default Settings;
