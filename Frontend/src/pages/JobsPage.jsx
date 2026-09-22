  
  
  import { Link } from "react-router-dom";

  import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Available Jobs
        </h1>

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-md p-6 mb-5"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {job.title}
            </h2>

            <p className="text-gray-600 mt-2">
              Company: {job.company}
            </p>

            <p className="text-gray-600 mt-2">
              Location: {job.location}
            </p>

            <p className="text-gray-600 mt-2">
              Salary: {job.salary}
            </p>

            <p className="text-gray-500 mt-2">
              {job.description}
            </p>
<Link
  to={`/jobs/${job._id}`}
  className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
>
  View Details
</Link>
            
          </div>
        ))}

      </div>
    </div>
  );
}

export default Jobs;