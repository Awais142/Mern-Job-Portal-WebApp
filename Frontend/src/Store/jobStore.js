import { create } from "zustand";
import {
  getAllJobs,
  getJobByIdApi,
  createJobPostApi,
} from "../Services/Api/JobsApi"; // Added createJobPost

const useJobStore = create((set) => ({
  jobs: [],
  job: null, // New state to store the fetched single job
  loading: false,
  error: null,

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
    set({ loading: true, error: null }); // Start loading state before posting

    try {
      const data = await createJobPostApi(jobData); // Call the API to create a new job post
      set((state) => ({ jobs: [...state.jobs, data.job], loading: false })); // Add the new job to the list
    } catch (error) {
      set({ error: error.message, loading: false }); // Handle error
    }
  },
}));

export default useJobStore;
