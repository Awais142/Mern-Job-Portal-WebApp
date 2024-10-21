import { create } from "zustand";
import { getAllJobs } from "../Services/Api/JobsApi";

const useJobStore = create((set) => ({
  jobs: [],
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

      const data = await getAllJobs(params); // Call the API
      set({ jobs: data.jobs, loading: false }); // Assume the response contains a "jobs" array
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useJobStore;
