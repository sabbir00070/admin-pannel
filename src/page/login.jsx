import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

const Login = () => {
  const [chatId, setChatId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/login?chat_id=${chatId}&password=${password}`
      );
      const data = await res.json();

      if (!data.status) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("admin_id", data.admin_id);
      navigate("/", { replace: true });
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500">
            Sign in to manage the dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Chat ID */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Chat ID
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={chatId}
              onChange={e => setChatId(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter chat ID"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2
                     bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium
                     hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;