function Jobs() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Available Jobs
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold text-gray-800">
            Frontend Developer
          </h2>

          <p className="text-gray-600 mt-2">
            React.js Developer
          </p>

          <p className="text-gray-500 mt-2">
            Location: Remote
          </p>

          <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            View Details
          </button>

        </div>

      </div>

    </div>
  );
}

export default Jobs;