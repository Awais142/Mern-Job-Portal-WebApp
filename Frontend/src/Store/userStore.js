import { create } from "zustand";
import { registerUserApi, loginUserApi } from "../Services/Api/userApi"; // Adjust the path as necessary

const useUserStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  message: null,

  // Function for user registration
  registerUser: async (userData) => {
    set({ loading: true, error: null, message: null });
    try {
      const data = await registerUserApi(userData); // Use the API function
      set({
        isAuthenticated: true,
        user: data.user,
        message: "Registration successful!",
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Function for user login
  loginUser: async (credentials) => {
    set({ loading: true, error: null, message: null });
    try {
      const data = await loginUserApi(credentials); // Use the API function
      set({
        isAuthenticated: true,
        user: data.user,
        message: "Login successful!",
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // Function to logout user
  logoutUser: () => set({ isAuthenticated: false, user: null }),

  // Clear errors and messages
  clearErrors: () => set({ error: null, message: null }),
}));

export default useUserStore;
