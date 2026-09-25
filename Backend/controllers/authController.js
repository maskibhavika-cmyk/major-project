const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    // 
    const { name, email, password, phone } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Create user
   const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  phone,
  role: "student",
});
    res.status(201).json({
  message: "User registered successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  },
});
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
// get user
const getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
const updateUserBlockStatus = async (req, res) => {
  try {
    const { isBlocked } = req.body;

    if (typeof isBlocked !== "boolean") {
      return res.status(400).json({
        message: "isBlocked must be true or false",
      });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({
        message: "Admin cannot block their own account",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Cannot block another admin",
      });
    }

    user.isBlocked = isBlocked;
    await user.save();

    res.status(200).json({
      message: isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user status",
    });
  }
};
module.exports = {
  registerUser,loginUser, getUser, updateUserBlockStatus
};