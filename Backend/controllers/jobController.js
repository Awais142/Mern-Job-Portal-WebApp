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

    if (
      !title ||
      !jobType ||
      !location ||
      !companyName ||
      !introduction ||
      !responsibilities ||
      !qualifications ||
      !salary ||
      !jobNiche
    ) {
      return res
        .status(400)
        .json({ message: "Please provide full job details." });
    }

    if (
      (personalWebsiteTitle && !personalWebsiteUrl) ||
      (!personalWebsiteTitle && personalWebsiteUrl)
    ) {
      return res.status(400).json({
        message: "Provide both the website URL and title, or leave both blank.",
      });
    }

    const postedBy = req.user._id;
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
    res
      .status(500)
      .json({ message: "Error posting job.", error: error.message });
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
    res.status(200).json({
      success: true,
      myJobs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching your jobs.", error: error.message });
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
