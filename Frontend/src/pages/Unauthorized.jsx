import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500">
          403
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Access Denied
        </h2>

        <p className="text-gray-400 mt-3">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;