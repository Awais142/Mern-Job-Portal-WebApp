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
export const loginUserApi = async (email, password, role) => {
  const response = await axios.post(`${API_BASE_URL}/api/user/login`, {
    email,
    password,
    role,
  });

  return response.data; // Return the response data directly
};
