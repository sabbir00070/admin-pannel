import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(() => navigate("/users"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Edit User</h1>
          <p className="text-sm text-gray-500">
            Manage account settings and permissions
          </p>
        </div>

        <button
          onClick={() => navigate("/users")}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to users
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* User Info */}
          <div className="flex items-center gap-4 px-6 py-5 border-b">
            <img
              src={user.imgUrl || "/avatar.png"}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium text-gray-900">
                {user.name || user.username || "Unknown User"}
              </p>
              <p className="text-sm text-gray-500">
                Chat ID: {user.chat_id}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Coins
                </label>
                <input
                  type="number"
                  value={user.coin}
                  onChange={e =>
                    setUser({ ...user, coin: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Referrals
                </label>
                <input
                  type="number"
                  value={user.rafer}
                  onChange={e =>
                    setUser({ ...user, rafer: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Premium User
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable premium features
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={user.isPremium}
                  onChange={e =>
                    setUser({ ...user, isPremium: e.target.checked })
                  }
                  className="w-4 h-4 accent-indigo-600"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Banned
                  </p>
                  <p className="text-xs text-gray-500">
                    Restrict account access
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={user.banned}
                  onChange={e =>
                    setUser({ ...user, banned: e.target.checked })
                  }
                  className="w-4 h-4 accent-red-600"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;