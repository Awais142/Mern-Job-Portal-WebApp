import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time"],
  },
  location: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  offers: {
    type: String,
  },
  salary: {
    type: String,
    required: true,
  },
  hiringMultipleCandidates: {
    type: Boolean,
    default: "No",
  },
  personalWebsite: {
    title: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  jobNiche: {
    type: String,
    required: true,
  },
  newsLettersSent: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Export the Job model
export const Job = mongoose.model("Job", jobSchema);
