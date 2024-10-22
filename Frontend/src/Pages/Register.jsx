import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import useUserStore from "../Store/userStore"; // Adjust the path as needed
import { nichesArray } from "../Data/jobsData";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const {
    loading,
    isAuthenticated,
    error,
    message,
    registerUser,
    clearErrors,
  } = useUserStore();

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    await registerUser(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [error, isAuthenticated, message, navigateTo, clearErrors]);

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
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-gray-100 text-gray-700"
            >
              <option value="">Select Role</option>
              <option value="Employer">Register as an Employer</option>
              <option value="Job Seeker">Register as a Job Seeker</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <FaPencilAlt className="mr-2 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <MdOutlineMailOutline className="mr-2 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="number"
                placeholder="111-222-333"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <FaPhoneFlip className="mr-2 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <FaAddressBook className="mr-2 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <RiLock2Fill className="mr-2 text-gray-500" />
            </div>
          </div>
          {role === "Job Seeker" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Your First Niche
                </label>
                <select
                  value={firstNiche}
                  onChange={(e) => setFirstNiche(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-gray-100 text-gray-700"
                >
                  <option value="">Your Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Your Second Niche
                </label>
                <select
                  value={secondNiche}
                  onChange={(e) => setSecondNiche(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-gray-100 text-gray-700"
                >
                  <option value="">Your Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Your Third Niche
                </label>
                <select
                  value={thirdNiche}
                  onChange={(e) => setThirdNiche(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-gray-100 text-gray-700"
                >
                  <option value="">Your Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  rows={5}
                  placeholder="Your Cover Letter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Resume</label>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={resumeHandler}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-zinc-500 hover:bg-zinc-600 text-white py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
