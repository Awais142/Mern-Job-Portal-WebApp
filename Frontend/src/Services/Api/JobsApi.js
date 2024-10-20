// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getAllJobs = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jobs/getall`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching jobs");
  }
};
