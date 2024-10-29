import React, { useState } from "react";
import { useJobStore } from "../Store/jobStore";
import { nichesArray } from "../Data/jobsData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPost = () => {
  const { createJobPost, loading, error } = useJobStore();
  const [jobData, setJobData] = useState({
    title: "",
    jobType: "",
    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    salary: "",
    hiringMultipleCandidates: false,
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
    jobNiche: "",
  });

  // State to hold field-specific error messages
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error message for the field being updated
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFieldErrors({});

    // Call createJobPost and handle field-specific error responses
    try {
      await createJobPost(jobData);
      toast.success("Job posted successfully!"); // Show success toast
      // Clear all fields by resetting jobData to initial state
      setJobData({
        title: "",
        jobType: "",
        location: "",
        companyName: "",
        introduction: "",
        responsibilities: "",
        qualifications: "",
        offers: "",
        salary: "",
        hiringMultipleCandidates: false,
        personalWebsiteTitle: "",
        personalWebsiteUrl: "",
        jobNiche: "",
      });
    } catch (error) {
      // Assuming error response contains field-specific messages
      if (error.response?.data) {
        const newFieldErrors = {};
        for (const key in error.response.data) {
          if (error.response.data[key]) {
            newFieldErrors[key] = error.response.data[key];
          }
        }
        setFieldErrors(newFieldErrors);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Post a New Job
      </h2>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.title ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.title && (
            <p className="text-red-500 text-sm">{fieldErrors.title}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="jobType"
            placeholder="Job Type"
            value={jobData.jobType}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.jobType ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.jobType && (
            <p className="text-red-500 text-sm">{fieldErrors.jobType}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.location ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.location && (
            <p className="text-red-500 text-sm">{fieldErrors.location}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={jobData.companyName}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.companyName ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.companyName && (
            <p className="text-red-500 text-sm">{fieldErrors.companyName}</p>
          )}
        </div>
        <div>
          <textarea
            name="introduction"
            placeholder="Introduction"
            value={jobData.introduction}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.introduction ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.introduction && (
            <p className="text-red-500 text-sm">{fieldErrors.introduction}</p>
          )}
        </div>
        <div>
          <textarea
            name="responsibilities"
            placeholder="Responsibilities"
            value={jobData.responsibilities}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.responsibilities ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.responsibilities && (
            <p className="text-red-500 text-sm">
              {fieldErrors.responsibilities}
            </p>
          )}
        </div>
        <div>
          <textarea
            name="qualifications"
            placeholder="Qualifications"
            value={jobData.qualifications}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.qualifications ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.qualifications && (
            <p className="text-red-500 text-sm">{fieldErrors.qualifications}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="offers"
            placeholder="Offers"
            value={jobData.offers}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.offers ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.offers && (
            <p className="text-red-500 text-sm">{fieldErrors.offers}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={jobData.salary}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.salary ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.salary && (
            <p className="text-red-500 text-sm">{fieldErrors.salary}</p>
          )}
        </div>
        {/* Dropdown for Hiring Multiple Candidates */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">Hiring Multiple Candidates:</label>
          <select
            name="hiringMultipleCandidates"
            value={jobData.hiringMultipleCandidates}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            name="personalWebsiteTitle"
            placeholder="Website Title"
            value={jobData.personalWebsiteTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.personalWebsiteTitle ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.personalWebsiteTitle && (
            <p className="text-red-500 text-sm">
              {fieldErrors.personalWebsiteTitle}
            </p>
          )}
        </div>
        <div>
          <input
            type="url"
            name="personalWebsiteUrl"
            placeholder="Website URL"
            value={jobData.personalWebsiteUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.personalWebsiteUrl ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.personalWebsiteUrl && (
            <p className="text-red-500 text-sm">
              {fieldErrors.personalWebsiteUrl}
            </p>
          )}
        </div>
        <div>
          <select
            name="jobNiche"
            value={jobData.jobNiche}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 ${
              fieldErrors.jobNiche ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select Job Niche
            </option>
            {nichesArray.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
          {fieldErrors.jobNiche && (
            <p className="text-red-500 text-sm">{fieldErrors.jobNiche}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default JobPost;
