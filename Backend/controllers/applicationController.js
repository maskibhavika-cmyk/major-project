const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

// Apply for Job
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


// Get Applicants
const getApplicantsByJob = async (req, res) => {
  try {
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


// Update Application Status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "applied",
      "shortlisted",
      "interview",
      "selected",
      "rejected",
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


// Schedule Interview
const scheduleInterview = async (req, res) => {
  try {
    const {
      interviewDate,
      interviewTime,
      interviewDetails,
    } = req.body;

    if (!interviewDate || !interviewTime) {
      return res.status(400).json({
        message: "Interview date and time are required",
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
        message: "You are not allowed to schedule this interview",
      });
    }

    application.interviewDate = interviewDate;
    application.interviewTime = interviewTime;
    application.interviewDetails = interviewDetails || "";

    application.status = "interview";

    await application.save();

    res.status(200).json({
      message: "Interview scheduled successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to schedule interview",
      error: error.message,
    });
  }
};


// Get My Applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    })
      .populate(
        "job",
        "title company location salary jobType"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "My applications fetched successfully",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch my applications",
      error: error.message,
    });
  }
};


module.exports = {
  applyJob,
  getApplicantsByJob,
  updateApplicationStatus,
  scheduleInterview,
  getMyApplications,
};