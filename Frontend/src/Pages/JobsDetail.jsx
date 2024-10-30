import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import useJobStore from "../Store/jobStore";
import useLoginStore from "../Store/userStore/loginStore"; // Import loginStore to access user role
import JobApplicationModal from "../Components/JobApplicationModal"; // Import the modal component
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from URL params
  const { job, loading, error, fetchJobById } = useJobStore(); // Fetch job details from store
  const { role } = useLoginStore(); // Fetch user info to get the role
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the job details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchJobById(id); // Call store method to fetch job by ID
    };
    fetchData();
  }, [id, fetchJobById]);

  const handleApplyClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) return <Spinner />; // Show spinner when loading
  if (error) return <p className="text-red-500">Error: {error}</p>; // Show error if any
  if (!job) return <p>Job not found</p>; // Handle case when job is not available

  return (
    <section className="job-details p-8 mt-12 max-w-4xl mx-auto">
      {/* Job Header */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <p className="text-gray-700 mb-2">
          <strong>Company: </strong> {job.companyName}
        </p>
        <div className="text-gray-700 flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-zinc-600" /> {job.location}
        </div>
        <div className="text-gray-700 flex items-center mb-2">
          <FaDollarSign className="mr-2 text-zinc-600" /> {job.salary}
        </div>
        <div className="text-gray-700 flex items-center mb-2">
          <FaCalendarAlt className="mr-2 text-zinc-600" /> Posted On:{" "}
          {new Date(job.jobPostedOn).toISOString().substring(0, 10)}
        </div>
      </div>

      {/* Job Introduction */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Job Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">{job.introduction}</p>
      </div>

      {/* Job Responsibilities */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Responsibilities
        </h2>
        <p className="text-gray-700 leading-relaxed">{job.responsibilities}</p>
      </div>

      {/* Job Qualifications */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Qualifications
        </h2>
        <p className="text-gray-700 leading-relaxed">{job.qualifications}</p>
      </div>

      {/* Job Offers */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Offers</h2>
        <ul className="list-disc list-inside text-gray-700">
          {job.offers.split(",").map((offer, index) => (
            <li key={index} className="mb-2">
              {offer}
            </li>
          ))}
        </ul>
      </div>

      {/* Personal Website */}
      {job.personalWebsite && (
        <div className="bg-white shadow-md rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Personal Website
          </h2>
          <a
            href={job.personalWebsite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline font-semibold hover:text-gray-900"
          >
            {job.personalWebsite.title}
          </a>
        </div>
      )}

      {/* Apply Button - Only show if user is not an Employer */}
      {role == "Job Seeker" && (
        <div className="text-right mt-8">
          <button
            onClick={handleApplyClick}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Apply Now
          </button>
        </div>
      )}

      {/* Application Modal */}
      <JobApplicationModal
        jobId={job._id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default JobDetails;
