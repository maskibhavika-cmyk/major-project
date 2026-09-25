const express = require("express");

const {
  applyJob,
  getApplicantsByJob,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/applicationController");

const authMiddleware = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");

const router = express.Router();

// Student: Apply for a job
router.post(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  applyJob
);

// Recruiter: View applicants for own job
router.get(
  "/job/:jobId",
  authMiddleware,
  authorizeRoles("recruiter"),
  getApplicantsByJob
);

// Student: View own applications
router.get(
  "/my-applications",
  authMiddleware,
  authorizeRoles("student"),
  getMyApplications
);

// Recruiter: Update application status
router.put(
  "/:id/status",
  authMiddleware,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);

module.exports = router;