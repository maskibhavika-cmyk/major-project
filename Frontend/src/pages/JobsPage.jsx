import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 3;

  // Fetch jobs
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

  // Filter/sort change hone par Page 1 par aayega
  useEffect(() => {
    setCurrentPage(1);
  }, [search, location, jobType, sortBy]);

  // Search + Filter
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();
    const locationText = location.toLowerCase().trim();
    const jobTypeText = jobType.toLowerCase().trim();

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText);

    const matchesLocation =
      job.location?.toLowerCase().includes(locationText);

    const matchesJobType =
      !jobTypeText ||
      job.jobType?.toLowerCase() === jobTypeText;

    return matchesSearch && matchesLocation && matchesJobType;
  });

  // Sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === "salaryLow") {
      return parseFloat(a.salary) - parseFloat(b.salary);
    }

    if (sortBy === "salaryHigh") {
      return parseFloat(b.salary) - parseFloat(a.salary);
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedJobs.length / jobsPerPage
  );

  const startIndex = (currentPage - 1) * jobsPerPage;

  const currentJobs = sortedJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

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

        {/* Search and Filters */}
        <div className="mb-8">

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full bg-[#111827] border border-gray-800 text-white placeholder-gray-500 rounded-lg px-5 py-3 outline-none focus:border-blue-600"
          />

          {/* Location */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location..."
            className="w-full mt-3 bg-[#111827] border border-gray-800 text-white placeholder-gray-500 rounded-lg px-5 py-3 outline-none focus:border-blue-600"
          />

          {/* Job Type */}
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full mt-3 bg-[#111827] border border-gray-800 text-gray-300 rounded-lg px-5 py-3 outline-none focus:border-blue-600"
          >
            <option value="">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full mt-3 bg-[#111827] border border-gray-800 text-gray-300 rounded-lg px-5 py-3 outline-none focus:border-blue-600"
          >
            <option value="">Sort Jobs</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="salaryLow">
              Salary: Low to High
            </option>
            <option value="salaryHigh">
              Salary: High to Low
            </option>
          </select>

        </div>

        {/* Result Count */}
        <p className="text-gray-400 mb-5">
          {filteredJobs.length} job
          {filteredJobs.length !== 1 ? "s" : ""} found
        </p>

        {/* Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
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
                  <p> {job.location}</p>

                  <p>
                     {job.salary || "Salary not specified"}
                  </p>

                  <p>
                    {job.jobType || "Job type not specified"}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#111827] border border-gray-800 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#111827] border border-gray-800 rounded-lg disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Jobs;