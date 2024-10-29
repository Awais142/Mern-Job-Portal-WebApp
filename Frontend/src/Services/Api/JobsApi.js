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

export const postJob = async (jobData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (!token) {
      throw new Error("User not authenticated. Please log in.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/jobs/post`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in headers
        },
      }
    );

    return response.data; // Return response data on success
  } catch (error) {
    console.error("Error Posting Job:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to post job"); // Error from server
    }
    throw new Error("Network error or server is unavailable"); // General error
  }
};
export const getMyJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token
    const response = await axios.get(`${API_BASE_URL}/api/jobs/getmyjobs`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the headers
      },
    });
    // Return only the data object, not the whole response
    return response.data;
  } catch (error) {
    console.error("Error Getting Jobs:", error);
    throw error;
  }
};
