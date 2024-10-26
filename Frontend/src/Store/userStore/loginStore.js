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

  // New method to check authentication on load
  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isAuthenticated: true });
      // Fetch user data if needed and set it in the state
    }
  },
}));

export default useLoginStore;
