import axios from "axios";
import { create } from "zustand";

const useRegisterStore = create((set) => ({
  // Form inputs
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  role: "",
  firstNiche: "",
  secondNiche: "",
  thirdNiche: "",
  coverLetter: null, // Assuming coverLetter is a file or string
  resume: null, // For handling resume uploads

  // Error object to hold field-specific errors
  errors: {},

  // Success and loading state
  successMessage: null,
  isLoading: false,

  // Actions to update form fields
  setField: (field, value) => set({ [field]: value }),

  // Register function
  register: async () => {
    set({ isLoading: true, errors: {}, successMessage: null }); // Reset errors and loading

    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
      resume,
    } = useRegisterStore.getState();

    // Form data object to send with the request
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("firstNiche", firstNiche);
    formData.append("secondNiche", secondNiche);
    formData.append("thirdNiche", thirdNiche);
    formData.append("coverLetter", coverLetter);

    // Add resume to formData if it's uploaded
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      // Post request to register user
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // For file uploads
          },
        }
      );

      // If registration is successful
      if (response.status === 201) {
        set({
          successMessage: response.data.message,
          errors: {},
          isLoading: false,
        });

        // Clear form fields after success
        set({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          role: "",
          firstNiche: "",
          secondNiche: "",
          thirdNiche: "",
          coverLetter: null,
          resume: null,
        });
      }
    } catch (error) {
      // Handle error responses and set field-specific errors
      if (error.response && error.response.data && error.response.data.errors) {
        set({
          errors: error.response.data.errors, // This contains field-specific errors
        });
      } else {
        set({
          errors: { general: "An unknown error occurred during registration." },
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRegisterStore;
