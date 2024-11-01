import React, { useState, useEffect } from "react";
import useLoginStore from "../Store/userStore/loginStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const { user, role, updateProfile, error, successMessage } = useLoginStore();
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
  });

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

    const result = await updateProfile(profileData);

    if (result && result.success) {
      toast.success("Profile updated successfully!");
    } else {
      // Display a toast message for general errors
      toast.error("Failed to update profile.");
    }
  };

  // Function to get field-specific error message
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

      {/* Display a general error message if there's an error */}
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
              {getFieldError("firstNiche") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("firstNiche")}
                </p>
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
              {getFieldError("secondNiche") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("secondNiche")}
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
