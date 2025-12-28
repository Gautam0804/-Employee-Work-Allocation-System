import { useEffect, useMemo, useState } from "react";
import api from "./api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (id === currentUserId) {
      alert("You cannot delete your own account");
      return;
    }

    if (!window.confirm("Delete this user permanently?")) return;

    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  const updateRole = async (id, role) => {
    await api.patch(`/users/${id}/role`, { role });
    fetchUsers();
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  if (loading) return <Skeleton />;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin – User Management</h1>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          className="border p-2 rounded w-full md:w-1/2"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-48"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>

                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      updateRole(u._id, e.target.value)
                    }
                    className={`border px-2 py-1 rounded text-sm ${roleStyle(
                      u.role
                    )}`}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="text-red-600 font-semibold hover:underline disabled:opacity-50"
                    disabled={u._id === currentUserId}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function roleStyle(role) {
  if (role === "admin") return "bg-purple-100 text-purple-700";
  if (role === "manager") return "bg-blue-100 text-blue-700";
  return "bg-green-100 text-green-700";
}

function Skeleton() {
  return (
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-gray-200 animate-pulse rounded"
        />
      ))}
    </div>
  );
}
