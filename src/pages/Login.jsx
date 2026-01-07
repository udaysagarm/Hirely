// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!form.email || !form.password) {
      setApiError("Please enter both email and password.");
      return;
    }

    showLoading("Logging in...");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        login(data.user, data.token);
        navigate("/user/home");
      } else {
        console.error("Login failed:", data.message || "Unknown error");
        setApiError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Network or server error during login:", error);
      setApiError("Network error. Please try again later.");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass glass-dark p-10 rounded-3xl w-full max-w-md text-gray-900 dark:text-gray-100 relative z-10"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          Login to <span className="gradient-text">Hirely</span>
        </h2>

        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="loginEmail" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label htmlFor="loginPassword" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="loginPassword"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Show Password Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            id="showLoginPassword"
            type="checkbox"
            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showLoginPassword" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Show Password
          </label>
        </div>

        {apiError && (
          <div className="p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 text-center dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          Login
        </button>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold transition-colors"
          >
            Create one instead
          </Link>
        </p>
      </form>
    </div>
  );
}