import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset error messages
      setError({});

      // Make the API call to login
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        {
          email,
          password,
          role,
        }
      );

      // Log the response data to check the structure
      console.log("Response data:", response.data);

      // Extract token and user data from the response
      const { token, user } = response.data; // Adjusted to match your response structure
      const { id, name, role: userRole } = user; // Destructuring user details

      // Ensure the token exists
      if (!token) {
        throw new Error("Token not found in response.");
      }

      // Store the token in local storage
      localStorage.setItem("token", token);
      // console.log("Stored token:", token);

      // Show success toast message
      toast.success("Login successful!");

      // Delay navigation for 2 seconds to show the success message
      setTimeout(() => {
        // Navigate based on user role
        navigate(userRole === "Employer" ? "/" : "/");
      }, 2000);
    } catch (err) {
      // Handle any errors during the login process and set specific error messages
      const errorResponse =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Login failed. Please check your credentials.";

      // Set specific error messages based on response
      if (errorResponse.includes("email")) {
        setError({ email: errorResponse });
      } else if (errorResponse.includes("password")) {
        setError({ password: errorResponse });
      } else {
        setError({ general: errorResponse });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Display general error message */}
        {error.general && (
          <p className="text-red-500 mb-4 text-center">{error.general}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                error.email ? "border-red-500" : ""
              }`}
              required
            />
            {/* Display email field error */}
            {error.email && <p className="text-red-500">{error.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                error.password ? "border-red-500" : ""
              }`}
              required
            />
            {/* Display password field error */}
            {error.password && <p className="text-red-500">{error.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
            {/* Display role field error if necessary */}
            {error.role && <p className="text-red-500">{error.role}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Login
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
