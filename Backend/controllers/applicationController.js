const Application = require("../models/applicationModel");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const application = await Application.create({
      job: jobId,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to apply for job",
      error: error.message,
    });
  }
};

module.exports = {
  applyJob,
};