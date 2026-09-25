const express = require("express");

const {
  createJob,
  getJobs, getMyJobs, getMyJobById,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const authMiddleware = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");

const router = express.Router();

// Public routes: anyone can view jobs
router.get("/", getJobs);
router.get(
  "/my-jobs",
  authMiddleware,
  authorizeRoles("recruiter"),
  getMyJobs
);
router.get(
  "/my-jobs/:id",
  authMiddleware,
  authorizeRoles("recruiter"),
  getMyJobById
);
router.get("/:id", getJobById);

// Recruiter-only routes
router.post(
  "/",
  authMiddleware,
  authorizeRoles("recruiter"),
  createJob
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("recruiter"),
  deleteJob
);

module.exports = router;