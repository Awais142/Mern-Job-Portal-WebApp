import { create } from "zustand";
import {
  getAllJobs,
  getJobByIdApi,
  getMyJobs,
  postJob,
} from "../Services/Api/JobsApi"; // Added createJobPost

export const useJobStore = create((set) => ({
  jobs: [],
  job: null, // New state to store the fetched single job
  loading: false,
  error: null,
  fieldErrors: {}, // Add field-specific errors

  // Fetch jobs from the API
  fetchJobs: async (city, niche, searchKeyword) => {
    set({ loading: true, error: null });

    try {
      // Prepare query parameters
      const params = {
        city: city || undefined,
        niche: niche || undefined,
        searchKeyword: searchKeyword || undefined,
      };

      const data = await getAllJobs(params); // Call the API to get all jobs
      set({ jobs: data.jobs, loading: false }); // Assume the response contains a "jobs" array
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single job by ID
  fetchJobById: async (id) => {
    set({ loading: true, error: null, job: null }); // Reset the state before fetching

    try {
      const data = await getJobByIdApi(id); // Call the API to get job details by ID
      set({ job: data.job, loading: false }); // Assume the response contains a "job" object
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new job post
  createJobPost: async (jobData) => {
    set({ loading: true, error: null, fieldErrors: {} }); // Start loading, reset errors

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
      console.error("Error posting job:", error);
      if (error.response && error.response.data.errors) {
        set({ fieldErrors: error.response.data.errors, loading: false });
      } else {
        set({ error: error.message, loading: false });
      }
    }
  },

  fetchMyJobs: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getMyJobs(); // `data` should now contain { success, myJobs } directly
      if (data && data.success) {
        // Check `data.success` instead of `status`
        set({ jobs: data.myJobs, loading: false });
      } else {
        throw new Error("Failed to load jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error); // Log any error for easier debugging
      set({ error: error.message, loading: false });
    }
  },
}));

export default useJobStore;
