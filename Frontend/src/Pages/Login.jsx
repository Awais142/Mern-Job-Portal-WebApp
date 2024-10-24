import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoginStore from "../Store/userStore/loginStore"; // Import the Zustand store

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Access the login function and error from the Zustand store
  const login = useLoginStore((state) => state.login);
  const error = useLoginStore((state) => state.error);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger the Zustand login function
    const success = await login(email, password, role);
    if (success) {
      // Show success toast
      toast.success("Login successful!");

      // Delay navigation for 2 seconds
      setTimeout(() => {
        // Navigate based on user role (access from Zustand)
        const userRole = useLoginStore.getState().role;
        if (userRole === "Employer") {
          navigate("/login"); // Adjust the path as needed
        } else {
          navigate("/"); // Adjust the path as needed
        }
      }, 2000); // 2-second delay before navigation
    } else {
      // Show error toast if login fails
      toast.error(error || "An error occurred during login.");
      console.log("An error occurred during login", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Display general error message */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {/* Display error related to email if present */}
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
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
