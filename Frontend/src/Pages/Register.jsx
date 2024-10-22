import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
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

  const { loading, error, message, registerUser, clearErrors } = useUserStore();
  const navigateTo = useNavigate();

  // State for error messages
  const [formErrors, setFormErrors] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
  });

  // Validation logic
  const validateForm = () => {
    let errors = {
      role: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      firstNiche: "",
      secondNiche: "",
      thirdNiche: "",
    };

    if (!role) errors.role = "Please select a role.";
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!phone) errors.phone = "Phone number is required.";
    if (!password) errors.password = "Password is required.";
    if (role === "Job Seeker") {
      if (!firstNiche) errors.firstNiche = "First niche is required.";
      if (!secondNiche) errors.secondNiche = "Second niche is required.";
      if (!thirdNiche) errors.thirdNiche = "Third niche is required.";
    }

    setFormErrors(errors); // Set the error messages
    return Object.values(errors).every((error) => error === ""); // Return true if no errors
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();
    if (!isValid) return; // If invalid, show errors

    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);

    // If Job Seeker, add extra fields
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      // Optional fields
      if (coverLetter) formData.append("coverLetter", coverLetter);
      if (resume) formData.append("resume", resume);
    }

    await registerUser(formData);
  };

  // Toast and error handling
  useEffect(() => {
    if (error) {
      setFormErrors({ ...formErrors, general: error });
      clearErrors();
    }

    if (message) {
      navigateTo("/login");
    }
  }, [error, message, navigateTo, clearErrors]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 pb-8 mt-4 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl poppins-regular">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create a New Account
        </h3>
        <form onSubmit={handleRegister}>
          {/* Role selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Register As</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setFormErrors({ ...formErrors, role: "" }); // Clear error on change
              }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
            >
              <option value="">Select Role</option>
              <option value="Employer">Register as an Employer</option>
              <option value="Job Seeker">Register as a Job Seeker</option>
            </select>
            {formErrors.role && (
              <p className="text-red-600">{formErrors.role}</p>
            )}
          </div>

          {/* Common Fields */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormErrors({ ...formErrors, name: "" }); // Clear error on change
                }}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <FaPencilAlt className="mr-2 text-gray-500" />
            </div>
            {formErrors.name && (
              <p className="text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormErrors({ ...formErrors, email: "" }); // Clear error on change
                }}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
            </div>
            {formErrors.email && (
              <p className="text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="number"
                placeholder="111-222-333"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFormErrors({ ...formErrors, phone: "" }); // Clear error on change
                }}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <FaPhoneFlip className="mr-2 text-gray-500" />
            </div>
            {formErrors.phone && (
              <p className="text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setFormErrors({ ...formErrors, address: "" }); // Clear error on change
                }}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <FaAddressBook className="mr-2 text-gray-500" />
            </div>
            {formErrors.address && (
              <p className="text-red-600">{formErrors.address}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormErrors({ ...formErrors, password: "" }); // Clear error on change
                }}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <RiLock2Fill className="mr-2 text-gray-500" />
            </div>
            {formErrors.password && (
              <p className="text-red-600">{formErrors.password}</p>
            )}
          </div>

          {/* Job Seeker Fields */}
          {role === "Job Seeker" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Niche 1</label>
                <select
                  value={firstNiche}
                  onChange={(e) => {
                    setFirstNiche(e.target.value);
                    setFormErrors({ ...formErrors, firstNiche: "" }); // Clear error on change
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                >
                  <option value="">Select Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
                {formErrors.firstNiche && (
                  <p className="text-red-600">{formErrors.firstNiche}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Niche 2</label>
                <select
                  value={secondNiche}
                  onChange={(e) => {
                    setSecondNiche(e.target.value);
                    setFormErrors({ ...formErrors, secondNiche: "" }); // Clear error on change
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                >
                  <option value="">Select Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
                {formErrors.secondNiche && (
                  <p className="text-red-600">{formErrors.secondNiche}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Niche 3</label>
                <select
                  value={thirdNiche}
                  onChange={(e) => {
                    setThirdNiche(e.target.value);
                    setFormErrors({ ...formErrors, thirdNiche: "" }); // Clear error on change
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                >
                  <option value="">Select Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
                {formErrors.thirdNiche && (
                  <p className="text-red-600">{formErrors.thirdNiche}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Your Cover Letter"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Resume</label>
                <input
                  type="file"
                  onChange={resumeHandler}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-300"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
