import React, { useEffect } from "react";
import useJobStore from "../Store/jobStore"; // Import the job store

const MyJobs = () => {
  const { jobs, fetchMyJobs, loading, error } = useJobStore(); // Destructure state and actions from job store

  // Fetch jobs on component mount
  useEffect(() => {
    fetchMyJobs();
  }, [fetchMyJobs]);

  // Display loading message while jobs are being fetched
  if (loading) {
    return <p className="text-center text-gray-500">Loading your jobs...</p>;
  }

  // Display error message if there was an error fetching jobs
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Display message if no jobs were found
  if (jobs.length === 0) {
    return (
      <p className="text-center text-gray-500">
        You haven't posted any jobs yet.
      </p>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg poppins-regular">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Jobs</h2>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="p-6 border border-gray-300 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-gray-500 text-sm mt-1">
              Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mt-4">
              <span className="font-semibold">Location:</span> {job.location}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Company:</span> {job.companyName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Job Type:</span> {job.jobType}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Salary:</span> {job.salary}
            </p>
            <p className="text-gray-700 mt-4">
              <span className="font-semibold">Introduction:</span>{" "}
              {job.introduction}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Responsibilities:</span>{" "}
              {job.responsibilities}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Qualifications:</span>{" "}
              {job.qualifications}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Offers:</span> {job.offers}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;