import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const registerUserApi = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data; // Return the success data
  } catch (error) {
    // Return the error message to the component
    return { error: error.message };
  }
};

// Login User API
export const loginUser = async (email, password, role) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/user/login`,
      { email, password, role },
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
