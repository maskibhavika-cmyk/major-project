const express = require("express");

const { registerUser, loginUser, getUser } = require("../controllers/authController");

const authMiddleware = require("../Middleware/authMiddleware");

const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users", getUser);

router.get("/users", authMiddleware, getUser);

module.exports = router;