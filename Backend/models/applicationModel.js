const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted",
        "interview",
        "selected",
        "rejected",
      ],
      default: "applied",
    },

    interviewDate: {
      type: Date,
    },

    interviewTime: {
      type: String,
    },

    interviewDetails: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);