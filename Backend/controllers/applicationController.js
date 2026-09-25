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

const getApplicantsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("user", "name email phone")
      .populate("job", "title company");

    res.status(200).json({
      message: "Applicants fetched successfully",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applicants",
      error: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update application status",
      error: error.message,
    });
  }
};
const getMyApplications = async (req, res) => {
  try {
    console.log("Logged in user:", req.user);

    const applications = await Application.find({
      user: req.user.id,
    })
      .populate("job", "title company location salary jobType")
      .sort({ createdAt: -1 });

    console.log("My applications:", applications);

    res.status(200).json({
      message: "My applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.log("My Applications Error:", error);

    res.status(500).json({
      message: "Failed to fetch my applications",
      error: error.message,
    });
  }
};
module.exports = {
  applyJob, getApplicantsByJob, updateApplicationStatus, getMyApplications
};