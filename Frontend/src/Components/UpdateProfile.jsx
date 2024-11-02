import React, { useState, useEffect } from "react";
import useLoginStore from "../Store/userStore/loginStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nichesArray } from "../Data/jobsData";

const UpdateProfile = () => {
  const { user, role, updateProfile, error, successMessage } = useLoginStore();

  // Include role in the initial state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    firstNiche: user?.niches?.firstNiche || "",
    secondNiche: user?.niches?.secondNiche || "",
    thirdNiche: user?.niches?.thirdNiche || "",
    coverLetter: user?.coverLetter || "",
    resume: null,
    role: role || "", // Initialize role from the store
  });

  // Update state when the user or role changes
  useEffect(() => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      firstNiche: user?.niches?.firstNiche || "",
      secondNiche: user?.niches?.secondNiche || "",
      thirdNiche: user?.niches?.thirdNiche || "",
      coverLetter: user?.coverLetter || "",
      resume: null,
      role: role || "", // Update role dynamically
    });
  }, [user, role]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateProfile(profileData);

    if (result && result.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
  };

  // Get field-specific error messages
  const getFieldError = (fieldName) => {
    if (error && typeof error === "object" && error[fieldName]) {
      return error[fieldName];
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Update Profile
      </h2>

      {error && typeof error === "string" && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
          />
          {getFieldError("name") && (
            <p className="text-red-500 text-sm">{getFieldError("name")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
          />
          {getFieldError("email") && (
            <p className="text-red-500 text-sm">{getFieldError("email")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
          />
          {getFieldError("phone") && (
            <p className="text-red-500 text-sm">{getFieldError("phone")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
          />
          {getFieldError("address") && (
            <p className="text-red-500 text-sm">{getFieldError("address")}</p>
          )}
        </div>

        {role === "Job Seeker" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">First Niche</label>
              <select
                name="firstNiche"
                value={profileData.firstNiche}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              >
                <option value="">Select First Niche</option>
                {nichesArray.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
              {getFieldError("firstNiche") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("firstNiche")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Second Niche</label>
              <select
                name="secondNiche"
                value={profileData.secondNiche}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              >
                <option value="">Select Second Niche</option>
                {nichesArray.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
              {getFieldError("secondNiche") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("secondNiche")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Third Niche</label>
              <select
                name="thirdNiche"
                value={profileData.thirdNiche}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              >
                <option value="">Select Third Niche</option>
                {nichesArray.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
              {getFieldError("thirdNiche") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("thirdNiche")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={profileData.coverLetter}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:border-gray-400 focus:ring-zinc-600"
                rows="3"
              />
              {getFieldError("coverLetter") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("coverLetter")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                className="mt-1 w-full p-2 border rounded focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
              {getFieldError("resume") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("resume")}
                </p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700"
        >
          Update
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default UpdateProfile;
