const express = require("express");
const cors = require("cors");

const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");

const jobRoutes = require("./Routes/jobRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
module.exports = app;