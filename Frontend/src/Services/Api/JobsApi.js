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
export const getJobByIdApi = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jobs/get/${id}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const createJobPostApi = async (jobData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/jobs/post`, jobData);
    return response.data; // Assuming the API sends back a success message or the created job post
  } catch (error) {
    console.error("Error posting the job:", error);
    throw error; // Re-throw the error to handle it later in the UI or store
  }
};
