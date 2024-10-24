import axios from "axios";
import { create } from "zustand";

const useLoginStore = create((set) => ({
  user: null,
  token: null,
  role: "guest",
  error: null,

  // Login function
  login: async (email, password, role) => {
    try {
      // Make the login request using axios
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        {
          email,
          password,
          role,
        }
      );

      // If login is successful, set the role and user data in the Zustand store
      if (response.status === 200) {
        const data = response.data;
        set({ role: data.user.role, user: data.user, token: data.token });

        // Save token to localStorage
        localStorage.setItem("token", data.token);

        return true; // Return success
      } else {
        set({ error: "Login failed, please check your credentials." });
        return false; // Return failure
      }
    } catch (error) {
      // Handle error (like network issues or server errors)
      set({ error: "An error occurred during login." });
      return false; // Return failure
    }
  },

  // Logout function
  logout: () => {
    set({ user: null, token: null, role: "guest", error: null });

    // Remove token from localStorage
    localStorage.removeItem("token");
  },
}));

export default useLoginStore;
