import { useEffect, useState } from "react";
import { Lock, Bell, Save } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("admin_id");
    const apiUrl = import.meta.env.VITE_MAIN_API;

  useEffect(() => {
    if (!adminId || !token) return;

    fetch(`${apiUrl}/api/admin/${adminId}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) setProfile(data);
      })
      .catch(() => {});
  }, [adminId, token]);

  const handleSave = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/users/${adminId}/change_pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          CPassword: currentPassword,
          NPassword: newPassword
        })
      });

      const data = await res.json();

      if (!res.ok || data.status === false) {
        setError(data.message || "Failed to update password");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password updated successfully");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex gap-5 items-center">
        <img
          src={profile?.imgUrl || "/avatar.png"}
          alt="Admin"
          className="w-20 h-20 rounded-full object-cover bg-slate-100"
        />
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            {profile?.name || "Admin"}
          </h1>
          <p className="text-sm text-slate-500">
            {profile?.username || "—"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Chat ID: {profile?.chat_id || "—"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border shadow-sm"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Change Password
            </h2>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none"
            />
          </div>
        </div>

        <div className="p-6 border-t space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Notifications
            </h2>
          </div>

          <label className="flex items-center justify-between p-4 rounded-xl border hover:bg-slate-50 cursor-pointer">
            <span className="text-sm text-slate-700">
              Enable admin notifications
            </span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="w-5 h-5 accent-slate-700"
            />
          </label>
        </div>

        <div className="p-6 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;