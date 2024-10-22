import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

// Register User API
export const registerUserApi = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/user/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Assuming the API sends back a success message or user data
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error(error.response.data.message || "Failed to register user"); // Use the error message from the server if available
  }
};

// Login User API
export const loginUserApi = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/user/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Assuming the API sends back the user data or a success message
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(error.response.data.message || "Failed to log in"); // Use the error message from the server if available
  }
};
