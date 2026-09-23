import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setSavedJobs(jobs);
  }, []);

  const handleRemove = (id) => {
    const updatedJobs = savedJobs.filter(
      (job) => job._id !== id
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setSavedJobs(updatedJobs);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          SAVED JOBS
        </p>

        <h1 className="text-4xl font-bold">
          My Saved Jobs
        </h1>

        <p className="text-gray-400 mt-3 mb-10">
          Jobs you saved for later.
        </p>

        {savedJobs.length === 0 ? (
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-300">
              No saved jobs
            </h2>

            <p className="text-gray-500 mt-2">
              Save a job from the job details page.
            </p>

            <Link
              to="/jobs"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6"
              >
                <h2 className="text-2xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-blue-400 mt-2">
                  {job.company}
                </p>

                <div className="mt-4 space-y-2 text-gray-400">
                  <p> {job.location}</p>

                  <p>
                    {job.salary || "Salary not specified"}
                  </p>

                  <p>
                     {job.jobType || "Not specified"}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleRemove(job._id)}
                    className="border border-gray-700 hover:bg-gray-800 px-5 py-2.5 rounded-lg font-medium"
                  >
                    Remove
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

export default SavedJobs;