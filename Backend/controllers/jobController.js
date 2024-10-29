import { Job } from "../models/jobsSchema.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilities,
      qualifications,
      offers,
      salary,
      hiringMultipleCandidates,
      personalWebsiteTitle,
      personalWebsiteUrl,
      jobNiche,
    } = req.body;
    console.log(
      title,
      jobType,
      location,
      responsibilities,
      qualifications,
      offers,
      salary,
      hiringMultipleCandidates,
      jobNiche
    );

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!jobType) missingFields.push("jobType");
    if (!location) missingFields.push("location");
    if (!companyName) missingFields.push("companyName");
    if (!introduction) missingFields.push("introduction");
    if (!responsibilities) missingFields.push("responsibilities");
    if (!qualifications) missingFields.push("qualifications");
    if (!salary) missingFields.push("salary");
    if (!jobNiche) missingFields.push("jobNiche");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Please provide the following fields: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Check for website title and URL consistency
    if (
      (personalWebsiteTitle && !personalWebsiteUrl) ||
      (!personalWebsiteTitle && personalWebsiteUrl)
    ) {
      return res.status(400).json({
        message: "Provide both the website URL and title, or leave both blank.",
      });
    }

    // Ensure `req.user._id` is defined
    const postedBy = req.user?._id;
    if (!postedBy) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Create the job post
    const job = await Job.create({
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilities,
      qualifications,
      offers,
      salary,
      hiringMultipleCandidates,
      personalWebsite: {
        title: personalWebsiteTitle,
        url: personalWebsiteUrl,
      },
      jobNiche,
      postedBy,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully.",
      job,
    });
  } catch (error) {
    console.error("Error in postJob:", error); // Logs detailed error in the console
    res.status(500).json({
      message: "Error posting job.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { city, niche, searchKeyword } = req.query;
    const query = {};

    if (city) {
      query.location = city;
    }
    if (niche) {
      query.jobNiche = niche;
    }
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { companyName: { $regex: searchKeyword, $options: "i" } },
        { introduction: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query);
    res.status(200).json({
      success: true,
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs.", error: error.message });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const myJobs = await Job.find({ postedBy: req.user._id });

    // Check if no jobs were found
    if (!myJobs || myJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
      });
    }

    res.status(200).json({
      success: true,
      myJobs,
    });
    // console.log("myJobs from job controller:", myJobs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching your jobs.",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Oops! Job not found." });
    }

    await job.deleteOne();
    res.status(200).json({
      success: true,
      message: "Job deleted.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting job.", error: error.message });
  }
};

export const getASingleJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job.", error: error.message });
  }
};
