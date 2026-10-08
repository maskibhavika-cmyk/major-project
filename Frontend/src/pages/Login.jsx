import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user data
      if (response.data.user) {
        localStorage.setItem(
        
          "user",
          JSON.stringify(response.data.user)
        );
        dispatch(
     login({
    user: response.data.user,
    token: response.data.token,
  })
);
      }

      alert("Login successful!");

if (response.data.user.role === "recruiter") {
  navigate("/recruiter/dashboard");
} else if (response.data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/");
  
}
    } catch (error) {
      console.log(
        "Login failed:",
        error.response?.data?.message || error.message
      );

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020712] text-white flex items-center justify-center px-4">

      <div className="w-full max-w-[520px] bg-[#111827] border border-[#263246] rounded-2xl p-7 shadow-2xl">

        {/* HEADING */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white">
            Welcome back
          </h1>

          <p className="text-[#8fa3c0] mt-2">
            Log in to continue to JobConnect.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-white mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111827] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#7184a1] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-white mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#111827] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#7184a1] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>

        </form>

        {/* DIVIDER */}
        <div className="border-t border-[#263246] my-6"></div>

        {/* DEMO ACCOUNTS */}
        <div>
          <p className="text-sm text-[#8fa3c0] mb-3">
            Demo accounts (password: demo123)
          </p>

          <div className="flex gap-3 flex-wrap">

            <button
              type="button"
              onClick={() =>
                setEmail("student@example.com")
              }
              className="bg-[#1e293b] hover:bg-[#263449] text-[#cbd5e1] px-4 py-2 rounded-full text-sm"
            >
              Student
            </button>

            <button
              type="button"
              onClick={() =>
                setEmail("recruiter@example.com")
              }
              className="bg-[#1e293b] hover:bg-[#263449] text-[#cbd5e1] px-4 py-2 rounded-full text-sm"
            >
              Recruiter
            </button>

            <button
              type="button"
              onClick={() =>
                setEmail("admin@example.com")
              }
              className="bg-[#1e293b] hover:bg-[#263449] text-[#cbd5e1] px-4 py-2 rounded-full text-sm"
            >
              Admin
            </button>

          </div>
        </div>

        {/* REGISTER */}
        <p className="text-center text-[#8fa3c0] mt-7">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;






















































































// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//  const handleLogin = async (e) => {
  
//   e.preventDefault();

//   try {
//     const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
//       email,
//       password,
//     });

//     console.log("Backend Response:", response.data);
//     localStorage.setItem("token", response.data.token);
// localStorage.setItem("user", JSON.stringify(response.data.user));

// console.log("Login successful, going to Home...");
// if (response.data.user.role === "recruiter") {
//   navigate("/recruiter/dashboard");
// } else if (response.data.user.role === "admin") {
//   navigate("/admin");
// } else {
//   navigate("/");
// }
//   } catch (error) {
//     console.log("Login Error:", error.response?.data || error.message);
//   }
// };
//   return (
//   <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      
//     <div className="w-full max-w-md bg-[#111827] p-8 rounded-xl shadow-md">

//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
//           Welcome Back
//         </h1>

//         <p className="text-gray-500 text-center mb-8">
//           Login to your JobConnect account
//         </p>

//         <form onSubmit={handleLogin}>

//           {/* Email */}
//           <div className="mb-5">
//             <label className="block text-gray-700 font-medium mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-6">
//             <label className="block text-gray-700 font-medium mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Register
//           </a>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Login;