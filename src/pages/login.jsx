import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login", {
        email: email,
        password: password,
      });
      console.log(response);
      toast.success("Login Successful");

      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to login");
    }
  }

  return (
    <div
      className="w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url('/background.jpg')` }} // Background image path
    >
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="flex flex-col items-center w-[400px] p-6 shadow-lg rounded-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Set custom transparency (80%)
            backdropFilter: "blur(5px)", // Apply blur effect
          }}
        >
          <img src="/logo.png" alt="Logo" className="w-[250px] mb-6" />
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Isuri Computers</h1>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="w-full text-right text-sm text-gray-500 mb-4">
            Forgot Password?{" "}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Reset
            </Link>
          </p>

          <button
            onClick={login}
            className="w-full p-3 mb-4 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <button
            className="w-full p-3 mb-4 text-white bg-gray-600 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
          >
            Login with Google
          </button>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}