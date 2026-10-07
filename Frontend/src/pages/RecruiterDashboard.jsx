import { useEffect, useState } from "react";
import axios from "axios";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Recruiter's jobs
        const jobsResponse = await axios.get(
          "http://localhost:8080/api/v1/jobs/my-jobs",
          { headers }
        );

        setJobs(jobsResponse.data.jobs || []);

        // Applications for recruiter's jobs
        let allApplications = [];

        for (const job of jobsResponse.data.jobs || []) {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/applications/job/${job._id}`,
              { headers }
            );

            allApplications = [
              ...allApplications,
              ...(response.data.applications || []),
            ];
          } catch (error) {
            console.log("Application fetch error:", error);
          }
        }

        setApplications(allApplications);
      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          RECRUITER
        </p>

        <h1 className="text-4xl font-bold">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-400 mt-3">
          Manage your jobs and applications.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400">
              Total Jobs
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {jobs.length}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400">
              Total Applications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {applications.length}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400">
              Pending Applications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {pendingApplications}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400">
              Accepted Applications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {acceptedApplications}
            </h2>
          </div>

        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Post Jobs
            </h2>

            <p className="text-gray-400 mt-2">
              Create and publish new job opportunities.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/recruiter/post-job")
              }
              className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium"
            >
              Post a Job
            </button>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Manage Jobs
            </h2>

            <p className="text-gray-400 mt-2">
              View and manage your posted jobs.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/recruiter/my-jobs")
              }
              className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium"
            >
              Manage Jobs
            </button>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Applications
            </h2>

            <p className="text-gray-400 mt-2">
              View applicants and manage application status.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/recruiter/my-jobs")
              }
              className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium"
            >
              View Applications
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;