const express = require("express");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

// Get Notifications
router.get("/", authMiddleware, getNotifications);

// Mark Notification as Read
router.put("/:id/read", authMiddleware, markAsRead);

module.exports = router;