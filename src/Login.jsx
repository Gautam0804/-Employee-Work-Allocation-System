import { useEffect, useState } from "react";
import api from "./api";

export default function Login({ setRole, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("employee"); // ✅ NEW
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("usedEmails")) || [];
    setEmailSuggestions(saved);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Save email history
      const stored = JSON.parse(localStorage.getItem("usedEmails")) || [];
      if (!stored.includes(email)) {
        localStorage.setItem("usedEmails", JSON.stringify([...stored, email]));
      }

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      setRole(res.data.role);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 DYNAMIC HEADING */
  const headingMap = {
    admin: "Admin Login",
    manager: "Manager Login",
    employee: "Employee Login",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl w-96">

        {/* ✅ Dynamic Heading */}
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          {headingMap[selectedRole]}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        {/* ROLE SELECT */}
        <div className="mb-4">
          <select
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <input
            list="email-suggestions"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <datalist id="email-suggestions">
            {emailSuggestions.map((e, i) => (
              <option key={i} value={e} />
            ))}
          </datalist>
        </div>

        {/* PASSWORD */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-4 top-3 cursor-pointer text-sm font-medium text-purple-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition
            ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        {goToRegister && (
          <p
            className="text-center text-sm mt-5 text-purple-700 cursor-pointer hover:underline"
            onClick={goToRegister}
          >
            New user? Register here
          </p>
        )}
      </div>
    </div>
  );
}
