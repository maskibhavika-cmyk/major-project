const Job = require("../models/jobModel");
// create job
const createJob = async (req, res) => {
  try {
    const { title, company, description, location, salary, jobType,skills } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      jobType,
      skills
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
//get job
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
//get job by id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,getJobById
};