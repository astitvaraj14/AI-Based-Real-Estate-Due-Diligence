// Dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const username = email ? email.split("@")[0] : "User";
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/properties");
        setProperties(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const propertyCount = properties.length;

const stats = [
  { title: "PROPERTIES EVALUATED", value: propertyCount },
  { title: "AVG RISK SCORE", value: "27/100" },
  { title: "REPORTS GENERATED", value: 96 },
  { title: "PENDING REVIEWS", value: 4 },
];

  return (
    <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <header className="h-20 bg-white border-b border-[#E3DDCE] flex items-center justify-between px-10">
          <input
            className="w-[380px] h-10 rounded-full border border-[#E3DDCE] px-5 text-sm bg-[#F8F6F0] focus:outline-none"
            placeholder="Search by address, parcel ID, or owner..."
          />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[2px] text-gray-500">
                Logged in as
              </p>
              <p className="font-semibold text-sm">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1B2338] text-white flex items-center justify-center text-sm">
              {username[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="px-10 py-8">
          <h1 className="font-serif text-[44px] text-[#1B2338] leading-tight">
            Good morning, {username}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {properties.length || 4} properties under review · 1 report ready
          </p>

          <div className="grid grid-cols-4 gap-5 mt-8">
            {stats.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <p className="text-[11px] uppercase tracking-[2px] text-gray-500">
                  {s.title}
                </p>
                <h2 className="text-[34px] mt-5 text-[#1B2338]">{s.value}</h2>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mt-8">
            <div className="col-span-2 bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-semibold mb-6 text-[#1B2338]">
                Recent Property Searches
              </h2>
              {properties.length === 0 ? (
                [
                  { title: "14 Lakeview Terrace, Austin TX", parcel: "AAT-2291", status: "CLEAR" },
                  { title: "402 Riverside Commons, Tampa FL", parcel: "ATF-0871 · Commercial", status: "REVIEW" },
                  { title: "9 Magnolia Court, Charleston SC", parcel: "ACT-2291", status: "FLAGGED" },
                  { title: "220 Harbor Point, Seattle WA", parcel: "ASE-1183 · Residential", status: "CLEAR" },
                ].map((p, i) => (
                  <StatusRow key={i} title={p.title} sub={`PARCEL #${p.parcel}`} status={p.status} />
                ))
              ) : (
                properties.slice(0, 4).map((p, i) => {
                  const st = ["CLEAR", "REVIEW", "FLAGGED", "CLEAR"][i % 4];
                  return (
                    <StatusRow
                      key={p.id}
                      title={p.title}
                      sub={`${p.city} · ${p.propertyType}`}
                      status={st}
                    />
                  );
                })
              )}
            </div>

            <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-semibold mb-6 text-[#1B2338]">
                Risk Distribution
              </h2>
              {[
                ["CLEAR", 65, "#4D7B73"],
                ["REVIEW", 25, "#C89546"],
                ["FLAGGED", 10, "#B45B46"],
              ].map(([n, v, c]) => (
                <div key={n} className="mb-5">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{n}</span>
                    <span>{v}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mt-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${v}%`, backgroundColor: c }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusRow({ title, sub, status }) {
  const cls = {
    CLEAR: "bg-green-100 text-green-700",
    REVIEW: "bg-yellow-100 text-yellow-700",
    FLAGGED: "bg-red-100 text-red-700",
  };
  return (
    <div className="flex justify-between items-center border-b border-[#F0EBE0] py-3.5 last:border-0">
      <div>
        <h3 className="font-semibold text-sm text-[#1B2338]">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${cls[status]}`}>
        {status}
      </span>
    </div>
  );
}

export default Dashboard;