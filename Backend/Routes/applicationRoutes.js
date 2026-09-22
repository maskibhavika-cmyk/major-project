const express = require("express");

const { applyJob } = require("../controllers/applicationController");

const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, applyJob);

module.exports = router;