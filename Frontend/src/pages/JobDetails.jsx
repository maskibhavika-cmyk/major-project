import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

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
    const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

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
    }
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          {job.title}
        </h1>

        <p className="text-gray-600 mt-3">
          Company: {job.company}
        </p>

        <p className="text-gray-600 mt-2">
          Location: {job.location}
        </p>

        <p className="text-gray-600 mt-2">
          Salary: {job.salary}
        </p>

        <p className="text-gray-700 mt-5">
          {job.description}
        </p>
        <button
  onClick={handleApply}
  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Apply Now
</button>

      </div>
    </div>
  );
}

export default JobDetails;