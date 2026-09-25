import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/api/v1/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(response.data.applications);
      } catch (error) {
        console.log(
          "My Applications Error:",
          error.response?.data || error.message
        );
      }
    };

    fetchMyApplications();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          STUDENT
        </p>

        <h1 className="text-4xl font-bold">
          My Applications
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          Track the jobs you have applied for.
        </p>

        {applications.length === 0 ? (
          <p className="text-gray-400">
            You have not applied for any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold">
                  {application.job?.title || "Job Title"}
                </h2>

                <p className="text-gray-400 mt-2">
                  Company:{" "}
                  {application.job?.company || "N/A"}
                </p>

                <p className="text-gray-400 mt-1">
                  Location:{" "}
                  {application.job?.location || "N/A"}
                </p>

                <p className="text-gray-400 mt-1">
                  Salary:{" "}
                  {application.job?.salary || "Not specified"}
                </p>

                <p className="text-gray-400 mt-1">
                  Job Type:{" "}
                  {application.job?.jobType || "N/A"}
                </p>

                <p className="text-gray-500 mt-4">
                  Applied On:{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

                <p className="text-yellow-400 mt-3 font-medium">
                  Status: {application.status}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyApplications;