import { useEffect, useState } from "react";
import useLoginStore from "../Store/userStore/loginStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdatePasswordComponent = () => {
  const { updatePassword, isAuthenticated } = useLoginStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.warn("New passwords do not match.");
      return;
    }

    const result = await updatePassword(currentPassword, newPassword);
    if (result.success) {
      toast.success("Password updated successfully!");
      setCurrentPassword(""); // Clear current password field
      setNewPassword(""); // Clear new password field
      setConfirmPassword(""); // Clear confirm password field
    } else {
      toast.error(result.message || "Password update failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-gray-700 font-medium">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 font-medium">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-gray-700 font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-300"
        >
          Update Password
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdatePasswordComponent;
