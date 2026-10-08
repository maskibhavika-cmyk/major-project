import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"));
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    setUser(null);

    navigate("/login");
  };

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

          {!user && (
            <>
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
            </>
          )}

          {user && (
            <>
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

              {user.role === "student" && (
                <NavLink
                  to="/my-applications"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  My Applications
                </NavLink>
              )}

              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Notifications
              </NavLink>

              {user.role === "recruiter" && (
                <>
                  <NavLink
                    to="/recruiter/dashboard"
                    className={({ isActive }) =>
                      `font-medium transition ${
                        isActive
                          ? "text-blue-500"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    Recruiter Dashboard
                  </NavLink>

                  <NavLink
                    to="/recruiter/my-jobs"
                    className={({ isActive }) =>
                      `font-medium transition ${
                        isActive
                          ? "text-blue-500"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    My Jobs
                  </NavLink>
                </>
              )}

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-400 font-medium hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;