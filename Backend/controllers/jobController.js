const Job = require("../models/jobModel");

const createJob = async (req, res) => {
  try {
    const { title, company, description, location, salary, skills } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      skills,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
};