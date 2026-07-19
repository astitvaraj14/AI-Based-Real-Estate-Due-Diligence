import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Property Search", path: "/properties" },
    { name: "Due Diligence", path: "/due-diligence" },
    { name: "Reports", path: "/reports" },
    { name: "Comparables", path: "/comparables" },
    { name: "Risk Monitoring", path: "/risk-monitoring" },
    { name: "Audit Log", path: "/audit-log" },
  ];

  return (
    <div className="w-[250px] min-h-screen bg-[#1F263B] text-white flex flex-col">

      <div className="px-8 py-10">
        <h1 className="text-sm tracking-[4px] uppercase font-light">
          DILIGENCE LEDGER
        </h1>
      </div>

      <div className="flex flex-col mt-4">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            to={menu.path}
            className={`px-8 py-4 uppercase tracking-[2px] text-[13px] transition
            ${
              location.pathname === menu.path
                ? "bg-[#303A56] border-l-4 border-[#F5F0E6]"
                : "hover:bg-[#29324B]"
            }`}
          >
            {menu.name}
          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;