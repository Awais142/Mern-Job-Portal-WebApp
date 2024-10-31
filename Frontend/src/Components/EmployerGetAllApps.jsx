import React, { useEffect } from "react";
import useApplicationStore from "../Store/ApplicationStore/AppStore"; // Adjust path if necessary
import { format } from "date-fns";

const EmployerApplications = () => {
  const { applications, fetchEmployerApplications, isLoading, error } =
    useApplicationStore();

  useEffect(() => {
    fetchEmployerApplications(); // Fetch applications on component mount
  }, [fetchEmployerApplications]);

  if (isLoading) return <div>Loading applications...</div>;
  if (error) return <div>Error loading applications: {error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Job Seeker Applications</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 mb-4 rounded-md bg-gray-50 shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {app.jobInfo?.jobTitle}
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>Applicant Name:</strong> {app.jobSeekerInfo.name}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Applicant Email:</strong> {app.jobSeekerInfo.email}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Cover Letter:</strong> {app.jobSeekerInfo.coverLetter}
            </p>
            <p className="text-gray-500 mt-2">
              <strong>Applied At:</strong>{" "}
              {format(new Date(app.createdAt), "PPPp")}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployerApplications;
