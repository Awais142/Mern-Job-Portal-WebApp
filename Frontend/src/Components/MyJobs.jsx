import React, { useEffect } from "react";
import useJobStore from "../Store/jobStore";

const MyJobs = () => {
  const { jobs, fetchMyJobs, loading, error, deleteJob, deletingJobId } =
    useJobStore();

  // Fetch jobs on component mount
  useEffect(() => {
    fetchMyJobs();
  }, [fetchMyJobs]);

  // Handler for deleting a job
  const handleDeleteJob = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return;

    const result = await deleteJob(jobId);
    if (result.success) {
      alert(result.message);
      fetchMyJobs(); // Refresh the list of jobs after deletion
    } else {
      alert(result.message || "Failed to delete job.");
    }
  };

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
      <h2 className="text-3xl text-black font-bold mb-4">My Jobs</h2>
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

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteJob(job._id)}
              className={`mt-4 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-zinc-900 ${
                deletingJobId === job._id ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={deletingJobId === job._id}
            >
              {deletingJobId === job._id ? "Deleting..." : "Delete Job"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
