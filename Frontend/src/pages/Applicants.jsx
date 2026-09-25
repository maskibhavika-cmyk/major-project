import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8080/api/v1/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(response.data.applications);
      } catch (error) {
        console.log(
          "Applicants Error:",
          error.response?.data || error.message
        );
      }
    };

    fetchApplicants();
  }, [jobId]);

  // Update application status
  const handleStatusChange = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/v1/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI immediately
      setApplications(
        applications.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application
        )
      );

      alert("Status updated successfully");
    } catch (error) {
      console.log(
        "Status Update Error:",
        error.response?.data || error.message
      );

      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          RECRUITER
        </p>

        <h1 className="text-4xl font-bold">
          Applicants
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          View applicants for this job.
        </p>

        {applications.length === 0 ? (
          <p className="text-gray-400">
            No applicants found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold">
                  {application.user?.name || "Unknown User"}
                </h2>

                <p className="text-gray-400 mt-2">
                  Email: {application.user?.email || "N/A"}
                </p>

                <p className="text-gray-400 mt-1">
                  Phone: {application.user?.phone || "N/A"}
                </p>

                <p className="text-gray-400 mt-4">
                  Job: {application.job?.title || "N/A"}
                </p>

                {/* Application Status */}
                <div className="mt-4">
                  <label className="text-gray-400 block mb-2">
                    Application Status
                  </label>

                  <select
                    value={application.status}
                    onChange={(e) =>
                      handleStatusChange(
                        application._id,
                        e.target.value
                      )
                    }
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">
                      Shortlisted
                    </option>
                    <option value="interview">
                      Interview
                    </option>
                    <option value="selected">
                      Selected
                    </option>
                    <option value="rejected">
                      Rejected
                    </option>
                  </select>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Applicants;