import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#030712] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-500"
        >
          JobConnect
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <NavLink
  to="/"
  className={({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-blue-500"
        : "text-gray-300 hover:text-white"
    }`
  }
>
  Home
</NavLink>

          <NavLink
  to="/jobs"
  className={({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-blue-500"
        : "text-gray-300 hover:text-white"
    }`
  }
>
  Jobs
</NavLink>

          <NavLink
  to="/login"
  className={({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-blue-500"
        : "text-gray-300 hover:text-white"
    }`
  }
>
  Login
</NavLink>

          <NavLink
  to="/register"
  className={({ isActive }) =>
    `px-5 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-blue-700 text-white"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`
  }
>
  Register
</NavLink>
          <Link
            to="/profile"
            className="text-gray-300 font-medium hover:text-white transition"
          >
            Profile
          </Link>
          <NavLink
  to="/saved-jobs"
  className={({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-blue-500"
        : "text-gray-300 hover:text-white"
    }`
  }
>
  Saved Jobs
</NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;