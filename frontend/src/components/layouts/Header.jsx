import {
  Bell,
  Plus,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Trash2,
  Check,
  Moon,
  Sun
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

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
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

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
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchNotifications() {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  }

  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      fetchNotifications();
    }

    // Listen for real-time notifications dispatched by DashboardLayout
    const handleNewNotification = (e) => {
      setNotifications((prev) => [e.detail, ...prev]);
    };

    window.addEventListener("new-notification", handleNewNotification);
    return () => window.removeEventListener("new-notification", handleNewNotification);
  }, [user]);

  async function toggleNotifications() {
    if (!showNotifications) {
      await fetchNotifications();
    }
    setShowNotifications(!showNotifications);
  }

  async function handleNotificationClick(notif) {
    if (!notif.read) {
      try {
        await api.put(`/notifications/${notif.id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
        );
      } catch (err) {}
    }
  }

  async function handleDeleteNotification(e, notifId) {
    e.stopPropagation();
    try {
      await api.delete(`/notifications/${notifId}`);
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  }

  function handleSearch(e) {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md dark:border-slate-800 transition-colors">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side */}

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
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
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="h-11 w-80 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notification */}

          <div className="relative" ref={notifRef}>
            <button 
              onClick={toggleNotifications}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white transition-colors"
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl z-50">
                <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 font-semibold text-sm">
                  Notifications
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-4 border-b border-slate-100 hover:bg-slate-50 flex justify-between items-start ${!n.read ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex-1 cursor-pointer pr-4" onClick={() => handleNotificationClick(n)}>
                          <h4 className="text-sm font-semibold text-slate-800">{n.title}</h4>
                          <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                        </div>
                        <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity">
                          {!n.read && (
                            <button 
                              onClick={() => handleNotificationClick(n)}
                              title="Mark as Read"
                              className="p-1 hover:bg-blue-100 hover:text-blue-600 rounded text-slate-400"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button 
                            onClick={(e) => handleDeleteNotification(e, n.id)}
                            title="Delete Notification"
                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded text-slate-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

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
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                {initial}
              </div>

              <div className="hidden text-left xl:block">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
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
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-50 text-slate-700 dark:text-slate-300">

                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User size={18} />
                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <hr className="dark:border-slate-700" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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