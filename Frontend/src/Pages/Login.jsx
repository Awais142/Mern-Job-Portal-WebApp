import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaLock } from "react-icons/fa";
import useUserStore from "../Store/userStore"; // Adjust the path as needed

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    role: "",
    email: "",
    password: "",
  });

  const { loading, error, message, loginUser, clearErrors } = useUserStore();
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessages({ role: "", email: "", password: "" }); // Clear previous errors

    // Basic validation
    let isValid = true;
    if (!role) {
      setErrorMessages((prev) => ({ ...prev, role: "Please select a role." }));
      isValid = false;
    }
    if (!email) {
      setErrorMessages((prev) => ({ ...prev, email: "Email is required." }));
      isValid = false;
    }
    if (!password) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
      isValid = false;
    }

    if (isValid) {
      const userData = { role, email, password };
      await loginUser(userData);
    }
  };

  // Error handling
  useEffect(() => {
    if (error) {
      setErrorMessages({ ...errorMessages, email: error }); // Show server error on email field
      clearErrors();
    }

    if (message) {
      navigateTo("/dashboard"); // Redirect after successful login
      console.log(message);
    }
  }, [error, message, navigateTo, clearErrors]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 pb-8 mt-4 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h3>
        <form onSubmit={handleLogin}>
          {/* Role selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
            {errorMessages.role && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.role}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <FaRegUser className="mr-2 text-gray-500" />
            </div>
            {errorMessages.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none"
              />
              <FaLock className="mr-2 text-gray-500" />
            </div>
            {errorMessages.password && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Not signed up yet?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
