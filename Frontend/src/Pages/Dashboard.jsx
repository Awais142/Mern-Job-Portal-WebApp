import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBriefcase, FaClipboardList } from "react-icons/fa";
import useLoginStore from "../Store/userStore/loginStore";
import MyJobs from "../Components/MyJobs";
import PostJob from "./PostJob";
import JobSeekerGetAllApps from "../Components/jobSeekerGetAllApps";
import EmployerGetAllApps from "../Components/EmployerGetAllApps";
const Dashboard = () => {
  const { user, role, logout, isAuthenticated } = useLoginStore();
  const [selectedSection, setSelectedSection] = useState("profile");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    console.log("handle logout");
  };
  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  const employerLinks = [
    { id: "post-job", label: "Post New Job", icon: <FaBriefcase /> },
    { id: "my-jobs", label: "My Jobs", icon: <FaClipboardList /> },
    { id: "applications", label: "Applications", icon: <FaClipboardList /> },
  ];

  const jobSeekerLinks = [
    {
      id: "my-applications",
      label: "My Applications",
      icon: <FaClipboardList />,
    },
  ];

  const renderLinks = role === "Employer" ? employerLinks : jobSeekerLinks;

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Sidebar (25% width) */}
      <div className="aside flex-grow bg-white p-6 w-1/4">
        <aside className=" bg-white text-black poppins-regular p-6 border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <nav className="space-y-4">
            {renderLinks.map((link) => (
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
          {/* Conditionally render placeholders for each section */}
          {selectedSection === "post-job" && <PostJob />}
          {selectedSection === "my-jobs" && <MyJobs />}
          {selectedSection === "applications" && <EmployerGetAllApps />}
          {selectedSection === "my-applications" && <JobSeekerGetAllApps />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
