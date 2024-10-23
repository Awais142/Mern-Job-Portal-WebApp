import { create } from "zustand";
import { registerUserApi } from "../Services/Api/userApi"; // Adjust the path as necessary

export const useUserStore = create((set) => ({
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
      console.log("store", data);
      // Check if registration was successful by looking for user data
      if (data && data.user) {
        set({
          isAuthenticated: false,
          user: data.user,
          message: "Registration successful!",
        });
      }
    } catch (err) {
      // Handle API error and set error message
      set({
        error: err.response?.data?.message || "Registration failed", // Prefer API error message if available
        message: null, // Clear the message in case of an error
      });
    } finally {
      set({ loading: false });
    }
  },

  // Function for user login
  login: async (email, password, role) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        {
          email,
          password,
          role,
        }
      );
      set({
        user: response.data.user,
        token: response.data.user.token,
        error: null, // Clear error on successful login
      });
      return response.data.user; // Return user data on success
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error logging in";
      set({ error: errorMessage }); // Save error message in the store
      return null; // Return null when login fails
    }
  },
  // loginUser: async (credentials) => {
  //   set({ loading: true, error: null, message: null });
  //   try {
  //     const data = await loginUserApi(credentials); // Use the API function
  //     set({
  //       isAuthenticated: true,
  //       user: data.user,
  //       message: "Login successful!",
  //     });
  //   } catch (err) {
  //     set({ error: err.response?.data?.message || "Login failed" });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  // Function to logout user
  logoutUser: () => set({ isAuthenticated: false, user: null }),

  // Clear errors and messages
  clearErrors: () => set({ error: null, message: null }),
}));

export default useUserStore;
