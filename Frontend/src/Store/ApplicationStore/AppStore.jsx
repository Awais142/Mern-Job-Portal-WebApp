import { create } from "zustand";
import axios from "axios";

const useApplicationStore = create((set) => ({
  isSubmitting: false,
  submitApplication: async (id, applicationData) => {
    set({ isSubmitting: true });

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const response = await axios.post(
        `http://127.0.0.1:5000/api/app/post/${id}`,
        applicationData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
        }
      );

      set({ isSubmitting: false });
      return {
        success: true,
        message: response.data.message,
        application: response.data.application,
      };
    } catch (error) {
      set({ isSubmitting: false });
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to submit application.",
      };
    }
  },
}));

export default useApplicationStore;
