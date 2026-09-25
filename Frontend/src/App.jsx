import { Routes, Route } from "react-router-dom";

import Jobs from "./pages/JobsPage";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import SavedJobs from "./pages/savedJobs";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";
import MyApplications from "./pages/MyApplications";
import Unauthorized from "./pages/Unauthorized";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />

        {/* Student and logged-in user routes */}
        <Route element={<ProtectedRoute allowedRoles={["student", "recruiter", "admin"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/my-applications" element={<MyApplications />} />
        </Route>

        {/* Recruiter routes */}
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/my-jobs" element={<MyJobs />} />
          <Route path="/recruiter/post-job" element={<PostJob />} />
          <Route path="/recruiter/edit-job/:id" element={<EditJob />} />
          <Route path="/recruiter/applicants/:jobId" element={<Applicants />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;