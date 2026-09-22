
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
      email,
      password,
    });

    console.log("Backend Response:", response.data);
    localStorage.setItem("token", response.data.token);
    console.log("Login successful, going to Home...");
navigate("/");
  } catch (error) {
    console.log("Login Error:", error.response?.data || error.message);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to your JobConnect account
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;