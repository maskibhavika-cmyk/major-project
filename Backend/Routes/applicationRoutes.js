const express = require("express");

const {
  applyJob,
  getApplicantsByJob,updateApplicationStatus,  getMyApplications
} = require("../controllers/applicationController");

const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, applyJob);
router.get(
  "/job/:jobId",
  authMiddleware,
  getApplicantsByJob
);
router.put(
  "/:id/status",
  authMiddleware,
  updateApplicationStatus
);
router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);
module.exports = router;