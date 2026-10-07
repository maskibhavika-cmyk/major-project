const express = require("express");
const multer = require("multer");

const User = require("../models/userModel");
const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../Middleware/authMiddleware");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Get Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.patch("/profile", authMiddleware, updateProfile);

// Upload Profile Picture
router.post(
  "/profile/picture",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Profile picture is required",
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          profilePicture: req.file.path,
        },
        {
          new: true,
        }
      ).select("-password");

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to upload profile picture",
        error: error.message,
      });
    }
  }
);

// Upload Resume
router.post(
  "/profile/resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Resume file is required",
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          resume: req.file.path,
        },
        {
          new: true,
        }
      ).select("-password");

      res.status(200).json({
        message: "Resume uploaded successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to upload resume",
        error: error.message,
      });
    }
  }
);

module.exports = router;