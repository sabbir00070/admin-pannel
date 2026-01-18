import {
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";

const StatCard = ({ icon: Icon, value, label, tone }) => (
  <div className="bg-white border rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm transition">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tone}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
        {value}
      </h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    fetch("/api/dashboard", { headers })
      .then(res => (res.status === 401 ? Promise.reject() : res.json()))
      .then(setStats)
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });

    fetch("/api/latest_users", { headers })
      .then(res => res.json())
      .then(setLatestUsers)
      .catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          System overview and recent activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value={stats.total}
          label="Total Users"
          tone="bg-indigo-600"
        />
        <StatCard
          icon={UserCheck}
          value={stats.active}
          label="Active Users"
          tone="bg-emerald-600"
        />
        <StatCard
          icon={AlertTriangle}
          value={stats.banned}
          label="Banned Users"
          tone="bg-rose-600"
        />
        <StatCard
          icon={Activity}
          value={stats.systemHealth}
          label="System Health"
          tone="bg-slate-700"
        />
      </div>

      {/* Latest Users */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-sm font-semibold text-gray-700">
            Latest Users
          </h2>

          <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y">
          {latestUsers.map(user => (
            <div
              key={user._id}
              className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
            >
              <img
                src={user.imgUrl || "/avatar.png"}
                className="w-10 h-10 rounded-full object-cover border"
                loading="lazy"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user.name || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  @{user.username}
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {user.time}
              </span>
            </div>
          ))}

          {latestUsers.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-gray-500">
              No recent users
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;