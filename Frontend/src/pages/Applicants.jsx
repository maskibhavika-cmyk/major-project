import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewDetails, setInterviewDetails] = useState("");

  const [selectedApplication, setSelectedApplication] = useState(null);

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

      alert(
        error.response?.data?.message || "Failed to update status"
      );
    }
  };

  // Schedule interview
  const handleScheduleInterview = async (applicationId) => {
    try {
      if (!interviewDate || !interviewTime) {
        alert("Please select interview date and time");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/api/v1/applications/${applicationId}/schedule-interview`,
        {
          interviewDate,
          interviewTime,
          interviewDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(
        applications.map((application) =>
          application._id === applicationId
            ? response.data.application
            : application
        )
      );

      setSelectedApplication(null);
      setInterviewDate("");
      setInterviewTime("");
      setInterviewDetails("");

      alert("Interview scheduled successfully");
    } catch (error) {
      console.log(
        "Schedule Interview Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to schedule interview"
      );
    }
  };

  // Filter applications
  const filteredApplications =
    filterStatus === "all"
      ? applications
      : applications.filter(
          (application) => application.status === filterStatus
        );

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          RECRUITER
        </p>

        <h1 className="text-4xl font-bold">
          Applicants
        </h1>

        <p className="text-gray-400 mt-3">
          View applicants for this job.
        </p>

        {/* Status Filter */}
        <div className="mt-6 mb-8">
          <label className="text-gray-400 block mb-2">
            Filter Applicants
          </label>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#111827] border border-gray-700 text-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
          >
            <option value="all">All Applicants</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applicants */}
        {filteredApplications.length === 0 ? (
          <p className="text-gray-400">
            No applicants found for this status.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredApplications.map((application) => (
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

                {/* Schedule Interview Button */}
                <button
                  onClick={() => {
                    setSelectedApplication(application._id);
                    setInterviewDate(
                      application.interviewDate
                        ? application.interviewDate.split("T")[0]
                        : ""
                    );
                    setInterviewTime(
                      application.interviewTime || ""
                    );
                    setInterviewDetails(
                      application.interviewDetails || ""
                    );
                  }}
                  className="mt-5 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  Schedule Interview
                </button>

                {/* Interview Form */}
                {selectedApplication === application._id && (
                  <div className="mt-5 border-t border-gray-700 pt-5">

                    <h3 className="text-lg font-semibold mb-4">
                      Schedule Interview
                    </h3>

                    {/* Date */}
                    <label className="text-gray-400 block mb-2">
                      Interview Date
                    </label>

                    <input
                      type="date"
                      value={interviewDate}
                      onChange={(e) =>
                        setInterviewDate(e.target.value)
                      }
                      className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 mb-4"
                    />

                    {/* Time */}
                    <label className="text-gray-400 block mb-2">
                      Interview Time
                    </label>

                    <input
                      type="time"
                      value={interviewTime}
                      onChange={(e) =>
                        setInterviewTime(e.target.value)
                      }
                      className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 mb-4"
                    />

                    {/* Details */}
                    <label className="text-gray-400 block mb-2">
                      Interview Details
                    </label>

                    <textarea
                      value={interviewDetails}
                      onChange={(e) =>
                        setInterviewDetails(e.target.value)
                      }
                      placeholder="Example: Google Meet interview"
                      className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 mb-4"
                      rows="3"
                    />

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleScheduleInterview(
                            application._id
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                      >
                        Save Interview
                      </button>

                      <button
                        onClick={() => {
                          setSelectedApplication(null);
                          setInterviewDate("");
                          setInterviewTime("");
                          setInterviewDetails("");
                        }}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>

                    </div>
                  </div>
                )}

                {/* Existing Interview Details */}
                {application.interviewDate && (
                  <div className="mt-5 bg-gray-800 rounded-lg p-4">
                    <p className="font-semibold text-green-400">
                      Interview Scheduled
                    </p>

                    <p className="text-gray-300 mt-2">
                      Date:{" "}
                      {new Date(
                        application.interviewDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-gray-300">
                      Time: {application.interviewTime}
                    </p>

                    {application.interviewDetails && (
                      <p className="text-gray-300 mt-1">
                        Details:{" "}
                        {application.interviewDetails}
                      </p>
                    )}
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Applicants;