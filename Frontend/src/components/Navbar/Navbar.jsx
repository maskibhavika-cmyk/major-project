import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          JobConnect
        </Link>

        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Jobs
          </Link>

          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Profile
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;