import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/jobs/${id}`
        );

        console.log("Job Details:", response.data);
        setJob(response.data.job);
      } catch (error) {
        console.log("Job Details Error:", error);
      }
    };

    fetchJob();
  }, [id]);
useEffect(() => {
  const savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  const alreadySaved = savedJobs.some(
    (savedJob) => savedJob._id === id
  );

  setIsSaved(alreadySaved);
}, [id]);
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/applications",
        {
          jobId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(
        "Apply Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message || "Failed to apply for job"
      );
    }
  };

 const handleSaveJob = () => {
  console.log("Saving Job:", job);
  const savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  const alreadySaved = savedJobs.some(
    (savedJob) => savedJob._id === job._id
  );

  if (alreadySaved) {
    const updatedJobs = savedJobs.filter(
      (savedJob) => savedJob._id !== job._id
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setIsSaved(false);
    alert("Job removed from saved jobs");
  } else {
    savedJobs.push(job);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );

    setIsSaved(true);
    alert("Job saved successfully");
  }
};
  if (!job) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">

          {/* Job Header */}
          <p className="text-blue-500 font-medium mb-2">
            JOB DETAILS
          </p>

          <h1 className="text-4xl font-bold">
            {job.title}
          </h1>

          <p className="text-blue-400 text-lg mt-3">
            {job.company}
          </p>

          {/* Job Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

            <div className="bg-[#030712] border border-gray-800 rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Location
              </p>
              <p className="text-gray-200 mt-1">
                {job.location}
              </p>
            </div>

            <div className="bg-[#030712] border border-gray-800 rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Salary
              </p>
              <p className="text-gray-200 mt-1">
                {job.salary || "Not specified"}
              </p>
            </div>

            <div className="bg-[#030712] border border-gray-800 rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Job Type
              </p>
              <p className="text-gray-200 mt-1">
                {job.jobType || "Not specified"}
              </p>
            </div>

          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">
              Job Description
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              {job.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3 mt-4">
              {job.skills?.length > 0 ? (
                job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-950 text-blue-400 px-4 py-2 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">
                  No skills specified
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">

            <button
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition"
            >
              Apply Now
            </button>

            <button
              onClick={handleSaveJob}
              className="border border-gray-700 hover:bg-gray-800 text-white px-7 py-3 rounded-lg font-semibold transition"
            >
              {isSaved ? "Saved ✓" : "Save Job"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default JobDetails;