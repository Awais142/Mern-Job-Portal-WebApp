import { create } from "zustand";
import axios from "axios";
import {
  getAllJobs,
  getJobByIdApi,
  getMyJobs,
  postJob,
} from "../Services/Api/JobsApi";

export const useJobStore = create((set) => ({
  jobs: [],
  job: null,
  loading: false,
  error: null,
  fieldErrors: {},
  deletingJobId: null, // Track the specific job ID being deleted

  // Fetch jobs from the API
  fetchJobs: async (city, niche, searchKeyword) => {
    set({ loading: true, error: null });

    try {
      const params = {
        city: city || undefined,
        niche: niche || undefined,
        searchKeyword: searchKeyword || undefined,
      };

      const data = await getAllJobs(params);
      set({ jobs: data.jobs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single job by ID
  fetchJobById: async (id) => {
    set({ loading: true, error: null, job: null });

    try {
      const data = await getJobByIdApi(id);
      set({ job: data.job, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new job post
  createJobPost: async (jobData) => {
    set({ loading: true, error: null, fieldErrors: {} });

    try {
      const data = await postJob(jobData);
      if (data && data.success) {
        set((state) => ({
          jobs: [...state.jobs, data.job],
          loading: false,
        }));
      } else {
        throw new Error("Failed to post job");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        set({ fieldErrors: error.response.data.errors, loading: false });
      } else {
        set({ error: error.message, loading: false });
      }
    }
  },

  // Fetch jobs posted by the user
  fetchMyJobs: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getMyJobs();
      if (data && data.success) {
        set({ jobs: data.myJobs, loading: false });
      } else {
        throw new Error("Failed to load jobs");
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a job by ID
  deleteJob: async (jobId) => {
    set({ deletingJobId: jobId }); // Set the specific job being deleted

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: Token is missing.");
      }

      const response = await axios.delete(
        `http://127.0.0.1:5000/api/jobs/delete/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== jobId), // Remove the deleted job from the list
        deletingJobId: null, // Reset the deleting state
      }));
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      set({ deletingJobId: null });
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete the job.",
        error: error.message,
      };
    }
  },
}));

export default useJobStore;
