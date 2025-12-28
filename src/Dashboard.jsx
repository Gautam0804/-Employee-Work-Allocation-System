import { useEffect, useMemo, useState } from "react";
import api from "./api";

export default function Dashboard({ role, logout }) {
  const userId = localStorage.getItem("userId");

  /* ---------------- STATES ---------------- */
  const [works, setWorks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [formError, setFormError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Toast
  const [toast, setToast] = useState("");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchWorks();
    if (role === "manager") fetchEmployees();
  }, [role]);

  const fetchWorks = async () => {
    setLoading(true);
    const res = await api.get("/work-items");

    setWorks(
      role === "employee"
        ? res.data.filter((w) => w.assignedTo === userId)
        : res.data
    );
    setLoading(false);
  };

  const fetchEmployees = async () => {
    const res = await api.get("/users/employees");
    setEmployees(res.data);
  };

  /* ---------------- ACTIONS ---------------- */
  const createWork = async () => {
    if (!title || !assignedTo) {
      setFormError("Task title and employee are required");
      return;
    }

    setFormError("");

    await api.post("/work-items", {
      title,
      description,
      assignedTo,
      dueDate,
      priority,
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");
    setDueDate("");
    setPriority("medium");

    setToast("✅ Task created successfully");
    setTimeout(() => setToast(""), 3000);

    fetchWorks();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/work-items/${id}/status`, { status });
    setToast("🔄 Status updated");
    setTimeout(() => setToast(""), 3000);
    fetchWorks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/work-items/${id}`);
    setToast("🗑 Task deleted");
    setTimeout(() => setToast(""), 3000);
    fetchWorks();
  };

  /* ---------------- HELPERS ---------------- */
  const stats = useMemo(
    () => ({
      total: works.length,
      pending: works.filter((w) => w.status === "pending").length,
      progress: works.filter((w) => w.status === "in-progress").length,
      completed: works.filter((w) => w.status === "completed").length,
    }),
    [works]
  );

  const isOverdue = (date, status) =>
    date && status !== "completed" && new Date(date) < new Date();

  const filteredWorks = works.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || w.status === statusFilter)
  );

  const sortedWorks = [...filteredWorks].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "priority") {
      const p = { high: 3, medium: 2, low: 1 };
      return p[b.priority] - p[a.priority];
    }
    return 0;
  });

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-extrabold mb-10">WorkFlowPro</h2>

        <div className="bg-white/10 p-4 rounded-xl mb-6">
          <p className="text-sm opacity-80">Logged in as</p>
          <p className="font-semibold capitalize">{role}</p>
        </div>

        <button
          onClick={logout}
          className="mt-auto bg-white text-purple-700 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 max-w-7xl mx-auto">

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <Stat label="Total Tasks" value={stats.total} />
          <Stat label="Pending" value={stats.pending} color="gray" />
          <Stat label="In Progress" value={stats.progress} color="yellow" />
          <Stat label="Completed" value={stats.completed} color="green" />
        </div>

        {/* CREATE TASK */}
        {role === "manager" && (
  <div className="bg-white p-6 rounded-2xl shadow mb-10 border border-gray-200">
    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
      ➕ Create New Task
    </h3>

    <div className="grid md:grid-cols-2 gap-5">

      {/* TITLE */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Task Title *
        </label>
        <input
          className="input"
          placeholder="Eg. Build dashboard UI"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* EMPLOYEE */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Assign Employee *
        </label>
        <select
          className="input"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* DESCRIPTION */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows="3"
          className="input resize-none"
          placeholder="Explain task details clearly..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* DUE DATE */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* PRIORITY */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Priority
        </label>
        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    {/* ERROR */}
    {formError && (
      <p className="text-red-600 text-sm mt-3 font-semibold">
        {formError}
      </p>
    )}

    {/* BUTTON */}
    <button
      onClick={createWork}
      className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 
      text-white px-8 py-3 rounded-xl font-semibold 
      hover:scale-105 hover:shadow-lg transition"
    >
       Create Task
    </button>
  </div>
)}


        {/* FILTERS */}
        <div className="flex gap-4 mb-6">
          <input className="input w-full" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="input" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* TASK LIST */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : sortedWorks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {sortedWorks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                role={role}
                updateStatus={updateStatus}
                deleteTask={deleteTask}
                overdue={isOverdue(task.dueDate, task.status)}
              />
            ))}
          </div>
        )}
      </main>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-purple-600 text-white px-5 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Input = ({ placeholder, value, onChange }) => (
  <input className="input" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
);

const Stat = ({ label, value, color = "purple" }) => {
  const map = {
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-gray-100 text-gray-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  };
  return (
    <div className={`p-5 rounded-xl shadow ${map[color]}`}>
      <p className="text-sm">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
};

const TaskCard = ({ task, role, updateStatus, deleteTask, overdue }) => (
  <div className={`bg-white p-5 rounded-2xl shadow border-l-4 ${
    overdue ? "border-red-600" :
    task.priority === "high" ? "border-red-500" :
    task.priority === "medium" ? "border-yellow-500" :
    "border-green-500"
  }`}>
    <h3 className="font-bold text-lg">{task.title}</h3>
    <p className="text-gray-600">{task.description}</p>

    {overdue && <p className="text-red-600 text-xs font-semibold mt-1">⚠ Overdue</p>}

    <Progress status={task.status} />

    <div className="flex justify-between mt-4">
      {role === "employee" && (
        <select className="input" value={task.status} onChange={e => updateStatus(task._id, e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      )}
      {role === "manager" && (
        <button onClick={() => deleteTask(task._id)} className="text-red-600 font-semibold">
          Delete
        </button>
      )}
    </div>
  </div>
);

const Progress = ({ status }) => {
  const percent = status === "pending" ? "25%" : status === "in-progress" ? "60%" : "100%";
  return (
    <div className="w-full bg-gray-200 rounded h-2 mt-2">
      <div className="h-2 bg-purple-600 rounded" style={{ width: percent }} />
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center text-gray-500 mt-20">
    <p className="text-xl font-semibold">No tasks found</p>
    <p className="text-sm">Create a task or adjust filters</p>
  </div>
);
