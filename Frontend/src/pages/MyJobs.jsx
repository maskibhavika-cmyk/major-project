import { useEffect, useState } from "react";
import axios from "axios";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/jobs"
        );

        setJobs(response.data.jobs);
      } catch (error) {
        console.log(
          "My Jobs Error:",
          error.response?.data || error.message
        );
      }
    };

    fetchJobs();
  }, []);

  // Delete Job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/jobs/${id}`
      );

      setJobs(jobs.filter((job) => job._id !== id));

      alert("Job deleted successfully");
    } catch (error) {
      console.log(
        "Delete Job Error:",
        error.response?.data || error.message
      );

      alert("Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-blue-500 font-medium mb-2">
          RECRUITER
        </p>

        <h1 className="text-4xl font-bold">
          My Posted Jobs
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          View the jobs posted by you.
        </p>

        {jobs.length === 0 ? (
          <p className="text-gray-400">
            No jobs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-400 mt-2">
                  {job.company}
                </p>

                <p className="text-gray-400 mt-1">
                  {job.location}
                </p>

                <p className="text-gray-400 mt-1">
                  {job.salary || "Not specified"}
                </p>

                <p className="text-gray-400 mt-1">
                   {job.jobType}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                 <button
  onClick={() =>
    (window.location.href = `/recruiter/edit-job/${job._id}`)
  }
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
>
  Edit
</button>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;