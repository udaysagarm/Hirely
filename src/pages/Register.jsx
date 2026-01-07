// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoading } from "../context/LoadingContext"; // Import useLoading hook

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    location: "",
    preferredDistance: "",
    role: "job_seeker",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }
    if (name === "preferredDistance") {
      if (value !== "" && !/^\d+$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (form.password !== form.confirm) {
      setApiError("Passwords do not match!");
      return;
    }

    if (!form.name || !form.email || !form.password || !form.location) {
      setApiError("Please fill all required fields.");
      return;
    }
    if (form.preferredDistance !== "" && (isNaN(parseInt(form.preferredDistance, 10)) || parseInt(form.preferredDistance, 10) < 0)) {
      setApiError("Preferred distance must be a non-negative number.");
      return;
    }

    showLoading("Registering...");

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone || null,
          location: form.location,
          preferredDistance: form.preferredDistance ? parseInt(form.preferredDistance, 10) : null,
          role: form.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        navigate("/login");
      } else {
        console.error("Registration failed:", data.message || "Unknown error");
        setApiError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Network or server error during registration:", error);
      setApiError("Network error. Please try again later.");
    } finally {
      hideLoading();
    }
  };

  const confirmFilled = form.confirm.length > 0;
  const passwordsMatch = form.password === form.confirm;

  const isFormValid =
    form.name &&
    form.email &&
    form.password &&
    form.confirm &&
    passwordsMatch &&
    form.location;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden py-10">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass glass-dark p-8 md:p-10 rounded-3xl w-full max-w-md text-gray-900 dark:text-gray-100 relative z-10"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          Join <span className="gradient-text">Hirely</span>
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. John Doe"
            onChange={handleChange}
            value={form.name}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. john@example.com"
            onChange={handleChange}
            value={form.email}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone (Optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. 1234567890"
            onChange={handleChange}
            value={form.phone}
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. New York, NY"
            onChange={handleChange}
            value={form.location}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Preferred Distance Field */}
        <div className="mb-4">
          <label htmlFor="preferredDistance" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Maximum Distance (miles)</label>
          <input
            id="preferredDistance"
            name="preferredDistance"
            type="number"
            placeholder="e.g. 25"
            onChange={handleChange}
            value={form.preferredDistance}
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            onChange={handleChange}
            value={form.password}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-2">
          <label htmlFor="confirm" className="sr-only">Confirm Password</label>
          <input
            id="confirm"
            name="confirm"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            onChange={handleChange}
            value={form.confirm}
            required
            className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
          {confirmFilled && !passwordsMatch && (
            <p className="text-red-500 text-xs mt-2 font-medium flex items-center">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-1 text-[10px]">✕</span> Passwords do not match
            </p>
          )}
          {confirmFilled && passwordsMatch && (
            <p className="text-green-500 text-xs mt-2 font-medium flex items-center">
              <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-1 text-[10px]">✓</span> Passwords match
            </p>
          )}
        </div>

        {/* Show Passwords Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            id="showPasswords"
            type="checkbox"
            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPasswords" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Show Passwords
          </label>
        </div>

        {apiError && (
          <div className="p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 text-center dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${isFormValid
            ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 active:translate-y-0"
            : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 shadow-none"
            }`}
        >
          Create Account
        </button>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold transition-colors"
          >
            Login instead
          </Link>
        </p>
      </form>
    </div>
  );
}