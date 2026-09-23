import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* Hero Section */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <p className="inline-block bg-blue-950/50 text-blue-500 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Frontend demo — mock data, no backend
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find your next role on
            <br />
            <span className="text-blue-600">JobConnect</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            A complete job & career platform for students, recruiters,
            and admins — search jobs, track applications, manage
            postings, and more.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
             >
  Get Started
</Link>

            <Link
           to="/login"
           className="border border-gray-700 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold"
             >
  Log In
</Link>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

          {/* Student */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-4">🎓</div>

            <h2 className="text-xl font-semibold">
              For Students
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Search, filter, and apply to jobs.
              Track every application.
            </p>
          </div>

          {/* Recruiter */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-4">🏢</div>

            <h2 className="text-xl font-semibold">
              For Recruiters
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Post jobs and manage applicants
              from one dashboard.
            </p>
          </div>

          {/* Admin */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-4">🛡️</div>

            <h2 className="text-xl font-semibold">
              For Admins
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Oversee users, recruiters, jobs,
              and platform activity.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;