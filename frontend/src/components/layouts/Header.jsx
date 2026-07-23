import {
  Bell,
  Plus,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/properties": "Properties",
  "/add-property": "Add Property",
  "/profile": "Profile",
  "/settings": "Settings",
  "/address": "Address Validation",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const title = pageTitles[location.pathname] || "Dashboard";

  const email =
    user?.email ||
    localStorage.getItem("email") ||
    "Administrator";

  const role =
    user?.role ||
    localStorage.getItem("role") ||
    "Property Officer";

  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your real estate due diligence workflow.
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search property..."
              className="h-11 w-80 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Notification */}

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Add Property */}

          <button
            onClick={() => navigate("/add-property")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Property
          </button>

          {/* User Dropdown */}

          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                {initial}
              </div>

              <div className="hidden text-left xl:block">
                <h3 className="text-sm font-semibold text-slate-900">
                  {email}
                </h3>

                <p className="text-xs uppercase text-slate-500">
                  {role}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-100"
                >
                  <User size={18} />
                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-100"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <hr />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}