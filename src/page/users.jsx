import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users as UsersIcon,
  ChevronLeft,
  ChevronRight,
  Pencil
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const params = new URLSearchParams({
      page,
      ...(search && { q: search })
    });

    fetch(`/api/users?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setPages(data.pages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, search]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Users
              </h1>
              <p className="text-xs text-gray-500">
                Page {page} of {pages}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search chat ID or username"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border
                         bg-white text-gray-800 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600">
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Chat ID</th>
                <th className="px-6 py-4 text-left">Coins</th>
                <th className="px-6 py-4 text-left">Premium</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-6">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </td>
                  </tr>
                ))}

              {!loading &&
                users.map(user => (
                  <tr
                    key={user._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.imgUrl || "/avatar.png"}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {user.name || user.username || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.time}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {user.chat_id}
                    </td>

                    <td className="px-6 py-4 font-semibold text-indigo-600">
                      {user.coin}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isPremium
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.banned
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.banned ? "Banned" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`${user._id}/edit`)}
                        className="inline-flex items-center gap-2 px-3 py-2
                                   rounded-lg text-xs font-semibold
                                   text-indigo-600 border border-indigo-200
                                   hover:bg-indigo-50 transition"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     border bg-white text-sm hover:bg-gray-50
                     disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          disabled={page === pages}
          onClick={() => setPage(p => p + 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     border bg-white text-sm hover:bg-gray-50
                     disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Users;