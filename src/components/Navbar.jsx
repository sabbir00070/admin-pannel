import { useState } from "react";
import {
  Menu,
  X,
  Banana,
  User,
  BrushCleaning,
  Settings,
  LayoutDashboard,
  ArrowRight
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkBase =
    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition";
  const linkActive =
    "text-indigo-600 bg-indigo-50";
  const linkIdle =
    "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
              <Banana className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 tracking-tight">
              Banana
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              <User className="w-4 h-4" />
              Users
            </NavLink>

            <NavLink
              to="/maintenance"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              <BrushCleaning className="w-4 h-4" />
              Maintenance
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            <button className="hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} w-full ${
                  isActive ? linkActive : linkIdle
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </NavLink>

            <NavLink
              to="/users"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} w-full ${
                  isActive ? linkActive : linkIdle
                }`
              }
            >
              <User className="w-5 h-5" />
              Users
            </NavLink>

            <NavLink
              to="/maintenance"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} w-full ${
                  isActive ? linkActive : linkIdle
                }`
              }
            >
              <BrushCleaning className="w-5 h-5" />
              Maintenance
            </NavLink>

            <NavLink
              to="/settings"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} w-full ${
                  isActive ? linkActive : linkIdle
                }`
              }
            >
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;