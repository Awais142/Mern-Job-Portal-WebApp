import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobsSchema.js";

export const postApplication = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, coverLetter } = req.body;

  // Check for required fields
  if (!name || !email || !phone || !address || !coverLetter) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const jobSeekerInfo = {
    id: req.user._id,
    name,
    email,
    phone,
    address,
    coverLetter,
    role: "Job Seeker",
  };

  // Find job details
  const jobDetails = Job.findById(id);
  if (!jobDetails) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  // Check if the user has already applied for the job
  const isAlreadyApplied = Application.findOne({
    "jobInfo.jobId": id,
    "jobSeekerInfo.id": req.user._id,
  });
  if (isAlreadyApplied) {
    return res.status(400).json({
      success: false,
      message: "You have already applied for this job.",
    });
  }

  // Use a default resume if not uploading
  // let resume = {
  //   public_id: req.user && req.user.resume ? req.user.resume.public_id : null,
  //   url: req.user && req.user.resume ? req.user.resume.url : null,
  // };

  // Create job info
  const employerInfo = {
    id: jobDetails.postedBy,
    role: "Employer",
  };
  const jobInfo = {
    jobId: id,
    jobTitle: jobDetails.title,
  };

  // Create the application
  const application = Application.create({
    jobSeekerInfo,
    employerInfo,
    jobInfo,
    resume,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted.",
    application,
  });
};

export const employerGetAllApplication = (req, res) => {
  const { _id } = req.user;

  const applications = Application.find({
    "employerInfo.id": _id,
    "deletedBy.employer": false,
  });

  res.status(200).json({
    success: true,
    applications,
  });
};

export const jobSeekerGetAllApplication = (req, res) => {
  const { _id } = req.user;

  const applications = Application.find({
    "jobSeekerInfo.id": _id,
    "deletedBy.jobSeeker": false,
  });

  res.status(200).json({
    success: true,
    applications,
  });
};

export const deleteApplication = (req, res) => {
  const { id } = req.params;
  const application = Application.findById(id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found.",
    });
  }

  const { role } = req.user;
  switch (role) {
    case "Job Seeker":
      application.deletedBy.jobSeeker = true;
      application.save();
      break;
    case "Employer":
      application.deletedBy.employer = true;
      application.save();
      break;

    default:
      console.log("Default case for application delete function.");
      break;
  }

  if (
    application.deletedBy.employer === true &&
    application.deletedBy.jobSeeker === true
  ) {
    application.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: "Application Deleted.",
  });
};
