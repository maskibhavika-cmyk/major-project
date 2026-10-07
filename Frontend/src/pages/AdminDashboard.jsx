import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Users aur jobs fetch karna
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersResponse, jobsResponse] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/auth/users", {
          headers,
        }),
        axios.get("http://localhost:8080/api/v1/jobs"),
      ]);

      setUsers(usersResponse.data.users || []);
      setJobs(jobsResponse.data.jobs || []);
    } catch (error) {
      setError(
        error.response?.data?.message || "Data fetch nahi ho paya"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // User ko block ya unblock karna
  const handleToggleBlock = async (user) => {
    const newStatus = !user.isBlocked;

    try {
      await axios.patch(
        `http://localhost:8080/api/v1/auth/users/${user._id}/block`,
        { isBlocked: newStatus },
        { headers }
      );

      setUsers((previousUsers) =>
        previousUsers.map((item) =>
          item._id === user._id
            ? { ...item, isBlocked: newStatus }
            : item
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "User status update nahi hua"
      );
    }
  };

  // Job delete karna
  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Kya aap ye job delete karna chahte ho?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/jobs/${jobId}`,
        { headers }
      );

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Job delete nahi hui"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] p-6 text-white">

      {/* Heading */}
      <h1 className="mb-6 text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* Dashboard Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">

        {/* Total Users */}
        <div className="rounded-lg bg-[#111827] p-5 shadow">
          <h2 className="text-gray-300">
            Total Users
          </h2>

          <p className="text-3xl font-bold text-white">
            {users.length}
          </p>
        </div>

        {/* Total Jobs */}
        <div className="rounded-lg bg-[#111827] p-5 shadow">
          <h2 className="text-gray-300">
            Total Jobs
          </h2>

          <p className="text-3xl font-bold text-white">
            {jobs.length}
          </p>
        </div>

      </div>

      {/* Users Section */}
      <section className="mb-10 rounded-lg bg-[#111827] p-5 shadow">

        <h2 className="mb-4 text-2xl font-semibold text-white">
          Manage Users
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-400">
            No users found.
          </p>
        ) : (
          <div className="space-y-3">

            {users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col justify-between gap-3 rounded border border-gray-700 p-4 sm:flex-row sm:items-center"
              >

                {/* User Information */}
                <div>

                  <p className="font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {user.email}
                  </p>

                  <p className="text-sm text-gray-300">
                    Role: {user.role}
                  </p>

                  <p className="text-sm text-gray-300">
                    Status:{" "}
                    {user.isBlocked
                      ? "Blocked"
                      : "Active"}
                  </p>

                </div>

                {/* Block / Unblock */}
                <button
                  onClick={() =>
                    handleToggleBlock(user)
                  }
                  disabled={user.role === "admin"}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  {user.isBlocked
                    ? "Unblock"
                    : "Block"}
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* Jobs Section */}
      <section className="rounded-lg bg-[#111827] p-5 shadow">

        <h2 className="mb-4 text-2xl font-semibold text-white">
          Manage Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-400">
            No jobs found.
          </p>
        ) : (
          <div className="space-y-3">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col justify-between gap-3 rounded border border-gray-700 p-4 sm:flex-row sm:items-center"
              >

                {/* Job Information */}
                <div>

                  <p className="font-semibold text-white">
                    {job.title}
                  </p>

                  <p className="text-sm text-gray-400">
                    {job.company}
                  </p>

                  <p className="text-sm text-gray-300">
                    {job.location}
                  </p>

                </div>

                {/* Delete Job */}
                <button
                  onClick={() =>
                    handleDeleteJob(job._id)
                  }
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete Job
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default AdminDashboard;