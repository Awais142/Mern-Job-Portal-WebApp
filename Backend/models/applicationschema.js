import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  jobSeekerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    resume: {
      public_id: String, // For cloud storage (like Cloudinary)
      url: String, // URL of the uploaded resume
    },
    coverLetter: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the employer in the User model
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  jobInfo: {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference to the Job model
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  deletedBy: {
    jobSeeker: {
      type: Boolean,
      default: false,
    },
    employer: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Application model
export const Application = mongoose.model("Application", applicationSchema);
