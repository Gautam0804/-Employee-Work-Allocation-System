import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AdminUsers from "./AdminUsers";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function App() {
  return (
    <Routes>

      {/* ---------- PUBLIC ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/register" element={<RegisterWrapper />} />

      {/* ---------- ROLE DASHBOARDS ---------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <DashboardWrapper />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["manager"]}>
              <DashboardWrapper />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["employee"]}>
              <DashboardWrapper />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ---------- ADMIN USERS ---------- */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

/* ================= WRAPPERS ================= */

function LoginWrapper() {
  const navigate = useNavigate();

  const handleSetRole = (role) => {
    localStorage.setItem("role", role);

    if (role === "admin") navigate("/admin", { replace: true });
    else if (role === "manager") navigate("/manager", { replace: true });
    else navigate("/employee", { replace: true });
  };

  return <Login setRole={handleSetRole} />;
}

function RegisterWrapper() {
  const navigate = useNavigate();
  return <Register goToLogin={() => navigate("/login")} />;
}

function DashboardWrapper() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <Dashboard
      role={role}
      logout={() => {
        localStorage.clear();
        navigate("/", { replace: true });
      }}
    />
  );
}
