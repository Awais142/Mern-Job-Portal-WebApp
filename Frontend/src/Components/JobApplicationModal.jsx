import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import useApplicationStore from "../Store/ApplicationStore/AppStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplicationModal = ({ jobId, isOpen, onClose }) => {
  const { submitApplication, isSubmitting } = useApplicationStore();
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitApplication(jobId, applicationData);

    if (result.success) {
      toast.success(result.message);
      setTimeout(onClose, 1500); // Close modal after a short delay to allow toast display
    } else if (result.message === "Already applied") {
      toast.warn("You have already submitted an application for this job.");
    } else {
      toast.error(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Apply for Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={applicationData.name}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={applicationData.email}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={applicationData.phone}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={applicationData.address}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-gray-700 font-medium">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={applicationData.coverLetter}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-300"
          >
            {isSubmitting ? "Submitting..." : "Apply"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default JobApplicationModal;
