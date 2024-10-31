import { create } from "zustand";
import axios from "axios";

const useApplicationStore = create((set) => ({
  applications: [],
  isSubmitting: false,
  isLoading: false,
  error: null,

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

  fetchJobSeekerApplication: async () => {
    set({ isLoading: true, error: null });

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/app/job-seeker/getall",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
          withCredentials: true,
        }
      );

      set({ applications: response.data.applications, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to load applications.",
      });
    }
  },
  fetchEmployerApplications: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get(
        "http://127.0.0.1:5000/api/app/employer/getall",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      set({
        applications: response.data.applications,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch applications.",
      });
    }
  },
}));

export default useApplicationStore;
