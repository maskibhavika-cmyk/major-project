import { useState } from "react";
import axios from "axios";
function PostJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/jobs",
      {
        ...job,
        skills: job.skills
          .split(",")
          .map((skill) => skill.trim()),
      }
    );

    console.log("Job Created:", response.data);

    alert("Job posted successfully");

    setJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      jobType: "Full Time",
      description: "",
      skills: "",
    });
  } catch (error) {
    console.log(
      "Post Job Error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
        "Failed to post job"
    );
  }
};
  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          RECRUITER
        </p>

        <h1 className="text-4xl font-bold">
          Post a Job
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          Create a new job opportunity.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-gray-800 rounded-xl p-8"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-gray-400 mb-2">
                Job Title
              </label>
              <input
                name="title"
                value={job.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Company
              </label>
              <input
                name="company"
                value={job.company}
                onChange={handleChange}
                placeholder="Company name"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Location
              </label>
              <input
                name="location"
                value={job.location}
                onChange={handleChange}
                placeholder="Bhopal / Remote"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Salary
              </label>
              <input
                name="salary"
                value={job.salary}
                onChange={handleChange}
                placeholder="5 LPA"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Job Type
              </label>

              <select
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Skills
              </label>
              <input
                name="skills"
                value={job.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="block text-gray-400 mb-2">
              Job Description
            </label>

            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              rows="6"
              placeholder="Enter job description..."
              className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Post Job
          </button>

        </form>
      </div>
    </div>
  );
}

export default PostJob;