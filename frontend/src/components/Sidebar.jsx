// Sidebar.jsx
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "DASHBOARD", path: "/dashboard" },
  { label: "PROPERTY SEARCH", path: "/property-search" },
  { label: "DUE DILIGENCE", path: "/due-diligence" },
  { label: "REPORTS", path: "/reports" },
  { label: "COMPARABLES", path: "/comparables" },
  { label: "RISK MONITORING", path: "/risk-monitoring" },
  { label: "AUDIT LOG", path: "/audit-log" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#1B2338] flex">
      {/* accent stripe */}
      <div className="w-1 h-full bg-[#3E63C2]" />
      <div className="flex-1 py-6 px-5">
        <p className="text-white text-[13px] tracking-[2px] font-medium mb-8">
          DILIGENCE LEDGER
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[12px] tracking-[1.5px] px-3 py-2.5 rounded transition-colors ${
                  isActive
                    ? "bg-[#2B3450] text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
export default Sidebar;