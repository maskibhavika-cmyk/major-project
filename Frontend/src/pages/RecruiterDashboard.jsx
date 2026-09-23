function RecruiterDashboard() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Post Jobs
            </h2>
            <p className="text-gray-400 mt-2">
              Create and publish new job opportunities.
            </p>
            <button
  onClick={() => window.location.href = "/recruiter/post-job"}
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
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Applications
            </h2>
            <p className="text-gray-400 mt-2">
              View applicants and manage application status.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;