import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoginStore from "../Store/userStore/loginStore"; // Import the Zustand store
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Access the login function, error, and fieldErrors from the Zustand store
  const login = useLoginStore((state) => state.login);
  const error = useLoginStore((state) => state.error);
  const fieldErrors = useLoginStore((state) => state.fieldErrors); // New field-specific errors
  const { isAuthenticated } = useLoginStore();
  useEffect(() => {
    // Redirect if user is logged in and role is "Employer"
    if (isAuthenticated) {
      navigateTo("/dashboard");
    }
  }, [isAuthenticated, navigateTo]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger the Zustand login function
    const success = await login(email, password, role);
    if (success) {
      // Show success toast
      toast.success("Login successful! Redirecting...");

      // Delay navigation for 2 seconds
      setTimeout(() => {
        const userRole = useLoginStore.getState().role;
        if (userRole === "Employer") {
          navigate("/"); // Adjust the path as needed
        } else {
          navigate("/"); // Adjust the path as needed
        }
      }, 1000); // 2-second delay before navigation
    } else if (error) {
      // Show a general error toast if no field-specific errors are present
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                fieldErrors.email ? "border-red-500" : ""
              }`}
              required
            />
            {/* Display error related to email if present */}
            {fieldErrors.email && (
              <p className="text-red-500 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                fieldErrors.password ? "border-red-500" : ""
              }`}
              required
            />
            {/* Display error related to password if present */}
            {fieldErrors.password && (
              <p className="text-red-500 mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                fieldErrors.role ? "border-red-500" : ""
              }`}
              required
            >
              <option value="">Select Role</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
            {/* Display error related to role if present */}
            {fieldErrors.role && (
              <p className="text-red-500 mt-1">{fieldErrors.role}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <p className="text-center text-gray-600 mt-4">
            <Link
              to="/forgot-password"
              className="text-gray-500 hover:underline font-bold"
            >
              Forgot Password?
            </Link>
          </p>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-500 hover:underline font-bold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
