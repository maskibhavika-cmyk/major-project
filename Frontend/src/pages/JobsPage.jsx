import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/jobs"
        );

        console.log("Jobs:", response.data);
        setJobs(response.data.jobs);
      } catch (error) {
        console.log("Jobs Error:", error);
      }
    };

    fetchJobs();
  }, []);

  // Search jobs by title or company
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    return (
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-blue-500 font-medium mb-2">
            EXPLORE OPPORTUNITIES
          </p>

          <h1 className="text-4xl font-bold">
            Find Your Next Job
          </h1>

          <p className="text-gray-400 mt-3">
            Explore available jobs and find an opportunity that
            matches your skills.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full bg-[#111827] border border-gray-800 text-white placeholder-gray-500 rounded-lg px-5 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Result Count */}
        <p className="text-gray-400 mb-5">
          {filteredJobs.length} job
          {filteredJobs.length !== 1 ? "s" : ""} found
        </p>

        {/* Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition"
              >
                <h2 className="text-2xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-blue-400 mt-2">
                  {job.company}
                </p>

                <div className="mt-4 space-y-2 text-gray-400">
                  <p>📍 {job.location}</p>

                  <p>
                    💰 {job.salary || "Salary not specified"}
                  </p>
                </div>

                <p className="text-gray-400 mt-4 line-clamp-2">
                  {job.description}
                </p>

                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h2 className="text-xl font-semibold text-gray-300">
                No jobs found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching with another job title or company.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Jobs;