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
        <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
         </Route>
      </Routes>
    </>
  );
}

export default App;