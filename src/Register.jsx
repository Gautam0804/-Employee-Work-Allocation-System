import { useState } from "react";
import api from "./api";

export default function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful. Please login.");
      goToLogin();
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-teal-500 to-blue-600">
      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          className="border rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-4 top-3 cursor-pointer text-sm font-medium text-teal-600 hover:text-teal-800"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <select
          className="border rounded-lg p-3 w-full mb-5 focus:ring-2 focus:ring-teal-500 outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-teal-500 to-blue-600 hover:scale-[1.02] hover:shadow-lg"
          }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p
          className="text-center text-sm mt-5 text-teal-700 cursor-pointer hover:underline"
          onClick={goToLogin}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
