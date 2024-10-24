import axios from "axios";
import { create } from "zustand";

const useLoginStore = create((set) => ({
  user: null,
  token: null,
  role: "guest",
  error: null,
  fieldErrors: {}, // Store field-specific errors

  // Login function
  login: async (email, password, role) => {
    try {
      // Make the login request using axios
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        { email, password, role }
      );

      // If login is successful, set the role and user data in the Zustand store
      if (response.status === 200) {
        const data = response.data;
        set({
          role: data.user.role,
          user: data.user,
          token: data.token,
          error: null,
          fieldErrors: {}, // Clear any previous field-specific errors
        });

        // Save token to localStorage
        localStorage.setItem("token", data.token);

        return true; // Return success
      } else {
        set({ error: "Login failed, please check your credentials." });
        return false; // Return failure
      }
    } catch (error) {
      // Handle errors (like network issues or server errors)
      if (error.response && error.response.data) {
        // Check for field-specific errors
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
      return false; // Return failure
    }
  },

  // Logout function
  logout: () => {
    set({
      user: null,
      token: null,
      role: "guest",
      error: null,
      fieldErrors: {},
    });

    // Remove token from localStorage
    localStorage.removeItem("token");
  },
}));

export default useLoginStore;
