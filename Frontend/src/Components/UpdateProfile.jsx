import React, { useState, useEffect } from "react";
import useLoginStore from "../Store/userStore/loginStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const { user, role, updateProfile, error, fieldErrors } = useLoginStore();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    firstNiche: user?.firstNiche || "",
    secondNiche: user?.secondNiche || "",
    thirdNiche: user?.thirdNiche || "",
    coverLetter: user?.coverLetter || "",
    resume: null,
  });

  useEffect(() => {
    // Reset form fields to latest data after each update
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      firstNiche: user?.firstNiche || "",
      secondNiche: user?.secondNiche || "",
      thirdNiche: user?.thirdNiche || "",
      coverLetter: user?.coverLetter || "",
      resume: null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateProfile(profileData);

      // Check if the result object exists and has the 'success' property
      if (result && result.success) {
        toast.success("Profile updated successfully!");
      } else {
        const errorMessage = result?.error || "Failed to update profile.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Update Profile
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common fields for all users */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-sm">{fieldErrors.name}</p>
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
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
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
          {fieldErrors.phone && (
            <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
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
          {fieldErrors.address && (
            <p className="text-red-500 text-sm">{fieldErrors.address}</p>
          )}
        </div>

        {/* Additional fields for Job Seekers */}
        {role === "Job Seeker" && (
          <>
            <div>
              <label className="block text-sm font-medium">First Niche</label>
              <input
                type="text"
                name="firstNiche"
                value={profileData.firstNiche}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
              />
              {fieldErrors.firstNiche && (
                <p className="text-red-500 text-sm">{fieldErrors.firstNiche}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Second Niche</label>
              <input
                type="text"
                name="secondNiche"
                value={profileData.secondNiche}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
              />
              {fieldErrors.secondNiche && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.secondNiche}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Third Niche</label>
              <input
                type="text"
                name="thirdNiche"
                value={profileData.thirdNiche}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-gray-400"
              />
              {fieldErrors.thirdNiche && (
                <p className="text-red-500 text-sm">{fieldErrors.thirdNiche}</p>
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
              {fieldErrors.coverLetter && (
                <p className="text-red-500 text-sm">
                  {fieldErrors.coverLetter}
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
              {fieldErrors.resume && (
                <p className="text-red-500 text-sm">{fieldErrors.resume}</p>
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
