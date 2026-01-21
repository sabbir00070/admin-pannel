import { useEffect, useState } from "react";
import {
  Wrench,
  Save,
  ToggleLeft,
  ToggleRight,
  Clock,
  FileText
} from "lucide-react";

const Maintenance = () => {
  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_MAIN_API;
  const toLocalDateTime = date =>
    date ? new Date(date).toISOString().slice(0, 16) : "";

  useEffect(() => {
    fetch(`${apiUrl}/api/getUpdates`, {
      headers: {
          "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
        }
    })
      .then(res => res.json())
      .then(data => {
        if (!data?.length) return;

        const m = data[0];
        setEnabled(m.enabled);
        setTitle(m.title || "");
        setMessage(m.message || "");
        setStartTime(toLocalDateTime(m.start_time));
        setEndTime(toLocalDateTime(m.end_time));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !message || !startTime || !endTime) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          enabled,
          title,
          message,
          start_time: startTime,
          end_time: endTime
        })
      });

      const data = await res.json();

      if (!res.ok || data.status === false) {
        setError("Failed to save maintenance");
        return;
      }

      setSuccess("Maintenance updated successfully");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
          <Wrench className="w-6 h-6 text-slate-700" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Maintenance Mode
          </h1>
          <p className="text-sm text-slate-500">
            Control system maintenance visibility
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border shadow-sm">
        <div className="p-6 space-y-5">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex items-center justify-between p-4 border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                {enabled ? (
                  <ToggleRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Maintenance Status
                </p>
                <p className="text-xs text-slate-500">
                  Enable or disable maintenance
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={e => setEnabled(e.target.checked)}
              className="w-5 h-5 accent-slate-800"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Message
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-slate-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Maintenance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Maintenance;