import {
  LayoutDashboard,
  Building2,
  MapPinned,
  UserCircle2,
  Settings,
  LogOut,
  ShieldCheck,
  FileText,
  Files,
  Scale,
  Crown
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Properties",
    icon: Building2,
    path: "/properties",
  },
  {
    name: "Address Validation",
    icon: MapPinned,
    path: "/address",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    name: "Documents",
    icon: Files,
    path: "/documents",
  },
  {
    name: "Compare",
    icon: Scale,
    path: "/compare",
  },
  {
    name: "Profile",
    icon: UserCircle2,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "Administrator";
  const role = localStorage.getItem("role") || "Property Officer";

  const initial = email.charAt(0).toUpperCase();

  function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors lg:flex lg:flex-col">

      {/* Logo */}

      <div className="flex h-20 items-center border-b border-slate-200 px-6">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ShieldCheck size={22} />
        </div>

        <div className="ml-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
            RealEstate AI
          </h2>

          <p className="text-xs text-slate-500">
            Due Diligence
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}

          {role.includes("ADMIN") && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Crown size={20} />
              <span className="font-medium">Admin Panel</span>
            </NavLink>
          )}

        </div>

      </nav>

      {/* User */}

      <div className="border-t border-slate-200 dark:border-slate-800 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {initial}
          </div>

          <div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">
              {email}
            </h3>

            <p className="text-xs text-slate-500">
              {role}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}