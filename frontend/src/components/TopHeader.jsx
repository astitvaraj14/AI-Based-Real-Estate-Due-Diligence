// components/TopHeader.jsx
import { useNavigate } from "react-router-dom";

function TopHeader({ placeholder = "Search by address, parcel ID, or owner..." }) {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role") || "Analyst";
  const username = email ? email.split("@")[0] : "User";

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      navigate(`/property-search?q=${encodeURIComponent(e.target.value.trim())}`);
    }
  };

  return (
    <header className="h-20 bg-white border-b border-[#E3DDCE] flex items-center justify-between px-10">
      <input
        onKeyDown={handleSearch}
        className="w-[380px] h-10 rounded-full border border-[#E3DDCE] px-5 text-sm bg-[#F8F6F0] focus:outline-none focus:ring-1 focus:ring-[#3E63C2]"
        placeholder={placeholder}
      />
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Logged in as</p>
          <p className="font-semibold text-sm">{role}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1B2338] text-white flex items-center justify-center text-sm">
          {username[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
