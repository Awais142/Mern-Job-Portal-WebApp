import axios from "axios";
import { create } from "zustand";

const useLoginStore = create((set) => ({
  user: null,
  token: null,
  role: "guest",
  error: null,
  fieldErrors: {},
  isAuthenticated: false,

  login: async (email, password, role) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        { email, password, role }
      );

      if (response.status === 200) {
        const data = response.data;
        set({
          role: data.user.role,
          user: data.user,
          token: data.token,
          error: null,
          fieldErrors: {},
          isAuthenticated: true,
        });

        localStorage.setItem("token", data.token);
        return true;
      } else {
        set({ error: "Login failed, please check your credentials." });
        return false;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          set({ fieldErrors: error.response.data.errors });
        } else {
          set({ error: error.response.data.message, fieldErrors: {} });
        }
      } else {
        set({
          error: "An unknown error occurred during login.",
          fieldErrors: {},
        });
      }
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      role: "guest",
      error: null,
      fieldErrors: {},
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/user/getuser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const userData = response.data.user;
          set({
            token,
            user: userData,
            role: userData.role,
            isAuthenticated: true,
          });
        }
      } catch (error) {
        set({
          token: null,
          user: null,
          role: "guest",
          isAuthenticated: false,
        });
        localStorage.removeItem("token");
      }
    }
  },
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await axios.put(
        "http://127.0.0.1:5000/api/user/update-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the request headers
          },
          withCredentials: true, // Maintain user session if needed
        }
      );

      console.log(response.data.message);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error(
        "Password update failed:",
        error.response?.data?.message || error.message
      );
      return {
        success: false,
        message: error.response?.data?.message || "Password update failed",
      };
    }
  },
  // Function to update user profile
  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null, successMessage: null });

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Send update profile request
      const response = await axios.put(
        "http://127.0.0.1:5000/api/user/update-profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(profileData);

      // Update user data and set success message
      set({
        user: response.data.user,
        successMessage: "Profile updated successfully.",
        isLoading: false,
        error: null, // Clear any previous errors
      });

      // Return a success object
      return { success: true };
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data?.message ||
        "Failed to update profile.";

      set({
        error: errorMessage, // Set the error object to show field-specific errors
        isLoading: false,
      });

      // Return a failure object with the error details
      return {
        success: false,
        error: errorMessage,
      };
    }
  },
}));

export default useLoginStore;
