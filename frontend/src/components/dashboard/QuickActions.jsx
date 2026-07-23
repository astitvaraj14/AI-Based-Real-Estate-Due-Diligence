import {
  Plus,
  Search,
  MapPinned,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Property",
      desc: "Register a new property",
      icon: Plus,
      color: "bg-blue-100 text-blue-600",
      route: "/add-property",
    },
    {
      title: "View Properties",
      desc: "Browse all registered properties",
      icon: Search,
      color: "bg-purple-100 text-purple-600",
      route: "/properties",
    },
    {
      title: "Address Validation",
      desc: "Validate property addresses",
      icon: MapPinned,
      color: "bg-green-100 text-green-600",
      route: "/address",
    },
    {
      title: "My Profile",
      desc: "Manage your profile",
      icon: User,
      color: "bg-cyan-100 text-cyan-600",
      route: "/profile",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used operations
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 p-6 sm:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.route)}
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-400
                hover:shadow-xl
              "
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {action.desc}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}