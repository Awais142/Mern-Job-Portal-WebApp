import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaRegUser, FaPhone } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nichesArray } from "../Data/jobsData";
import useRegisterStore from "../Store/userStore/registerStore"; // Import Zustand store

const Register = () => {
  const navigateTo = useNavigate();
  const {
    name,
    email,
    phone,
    address,
    password,
    role,
    firstNiche,
    secondNiche,
    thirdNiche,
    coverLetter,
    resume,
    errors,
    setField,
    register,
    isLoading,
  } = useRegisterStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = register();

    if (success) {
      toast.success("Registered Successfully!");
      setTimeout(() => navigateTo("/login"), 2000);
    } else if (errors) {
      toast.error(errors);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 pb-8 mt-4 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl poppins-regular">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create a New Account
        </h3>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Register As</label>
            <select
              value={role}
              onChange={(e) => setField("role", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
            >
              <option value="">Select Role</option>
              <option value="Employer">Register as an Employer</option>
              <option value="Job Seeker">Register as a Job Seeker</option>
            </select>
            {errors.role && <p className="text-red-600">{errors.role}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none"
                />
                <FaRegUser className="mr-2 text-gray-500" />
              </div>
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none"
                />
                <FaEnvelope className="mr-2 text-gray-500" />
              </div>
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                <input
                  type="number"
                  placeholder="111-222-333"
                  value={phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none"
                />
                <FaPhone className="mr-2 text-gray-500" />
              </div>
              {errors.phone && <p className="text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                <input
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setField("address", e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none"
                />
                <FaAddressBook className="mr-2 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setField("password", e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <RiLock2Fill className="mr-2 text-gray-500" />
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Conditional Fields for Job Seekers */}
          {role === "Job Seeker" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">First Niche</label>
                <select
                  value={firstNiche}
                  onChange={(e) => setField("firstNiche", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                >
                  <option value="">Select First Niche</option>
                  {nichesArray.map((niche) => (
                    <option key={niche} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
                {errors.firstNiche && (
                  <p className="text-red-600">{errors.firstNiche}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Second Niche</label>
                <select
                  value={secondNiche}
                  onChange={(e) => setField("secondNiche", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                >
                  <option value="">Select Second Niche</option>
                  {nichesArray.map((niche) => (
                    <option key={niche} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
                {errors.secondNiche && (
                  <p className="text-red-600">{errors.secondNiche}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">First Niche</label>
                <select
                  value={thirdNiche}
                  onChange={(e) => setField("thirdNiche", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                >
                  <option value="">Select Third Niche</option>
                  {nichesArray.map((niche) => (
                    <option key={niche} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
                {errors.thirdNiche && (
                  <p className="text-red-600">{errors.thirdNiche}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Cover Letter (optional)
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your cover letter here..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-gray-100"
                />
              </div>
            </>
          )}
          {role === "Job Seeker" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload Resume</label>
              <input
                type="file"
                onChange={(e) => setField("resume", e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow-sm mt-4"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-500 hover:underline font-bold"
            >
              Login
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Register;
