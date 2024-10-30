import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../Store/userStore/loginStore";

const Profile = () => {
  const { user, isAuthenticated, checkAuth } = useLoginStore();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated on component mount
    checkAuth();
    if (!isAuthenticated) {
      navigate("/login"); // Redirect if not authenticated
    } else {
      setFormData(user); // Set user data to formData
    }
  }, [isAuthenticated, checkAuth, navigate]);

  if (!formData) {
    return <p>Loading...</p>; // Optional loading message
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      {/* Common fields */}
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Address:
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Role:
        <input
          type="text"
          name="role"
          value={formData.role || ""}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </label>

      {/* Job Seeker-specific fields */}
      {formData.role === "Job Seeker" && (
        <>
          <label className="block mb-2">
            First Niche:
            <input
              type="text"
              name="firstNiche"
              value={formData.niches?.firstNiche || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-2">
            Second Niche:
            <input
              type="text"
              name="secondNiche"
              value={formData.niches?.secondNiche || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-2">
            Third Niche:
            <input
              type="text"
              name="thirdNiche"
              value={formData.niches?.thirdNiche || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-2">
            Cover Letter:
            <textarea
              name="coverLetter"
              value={formData.coverLetter || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-2">
            Resume:
            <input
              type="text"
              name="resume"
              value={formData.resume?.public_id || "No Resume Uploaded"}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </label>
        </>
      )}
    </div>
  );
};

export default Profile;
