
const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
  return res.status(400).json({
    message: "Job ID is required",
  });
}

const job = await Job.findById(jobId);

if (!job) {
  return res.status(404).json({
    message: "Job not found",
  });
}
    const existingApplication = await Application.findOne({
  job: jobId,
  user: req.user.id,
});

if (existingApplication) {
  return res.status(400).json({
    message: "You have already applied for this job",
  });
}

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
    // Check whether this job belongs to logged-in recruiter
    const job = await Job.findOne({
      _id: req.params.jobId,
      recruiter: req.user.id,
    });

    if (!job) {
      return res.status(403).json({
        message: "You are not allowed to view these applicants",
      });
    }

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
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const job = await Job.findOne({
      _id: application.job,
      recruiter: req.user.id,
    });

    if (!job) {
      return res.status(403).json({
        message: "You are not allowed to update this application",
      });
    }

    application.status = status;
    await application.save();

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