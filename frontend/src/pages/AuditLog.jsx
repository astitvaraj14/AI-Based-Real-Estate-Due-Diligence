// AuditLog.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import api from "../services/api";

const FALLBACK_LOG = [
  { id: 1, timestamp: "2026-07-18 14:32", user: "durga.prasad", action: "GENERATED_REPORT", detail: "Generated Full Due Diligence report for 9 Magnolia Court, Charleston SC" },
  { id: 2, timestamp: "2026-07-18 11:05", user: "system", action: "RISK_FLAGGED", detail: "Flagged 9 Magnolia Court, Charleston SC after new lien detected" },
  { id: 3, timestamp: "2026-07-17 16:48", user: "a.reddy", action: "PROPERTY_SEARCH", detail: "Searched for '402 Riverside Commons'" },
  { id: 4, timestamp: "2026-07-17 09:12", user: "durga.prasad", action: "STATUS_CHANGE", detail: "Marked 220 Harbor Point, Seattle WA as Clear" },
  { id: 5, timestamp: "2026-07-16 18:20", user: "system", action: "REPORT_COMPLETE", detail: "Title & Lien Summary completed for 402 Riverside Commons, Tampa FL" },
];

const ACTION_LABELS = {
  GENERATED_REPORT: "Report generated",
  RISK_FLAGGED: "Risk flagged",
  PROPERTY_SEARCH: "Property search",
  STATUS_CHANGE: "Status change",
  REPORT_COMPLETE: "Report complete",
};

function AuditLog() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [actionFilter, setActionFilter] = useState("ALL");
  const [userFilter, setUserFilter] = useState("");

  const fetchLog = async () => {
    setLoading(true);
    try {
      const res = await api.get("/audit-log");
      setLog(res.data);
      setUsingFallback(false);
    } catch (e) {
      console.log(e);
      setLog(FALLBACK_LOG);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLog();
  }, []);

  const filtered = log.filter((entry) => {
    const actionMatch = actionFilter === "ALL" || entry.action === actionFilter;
    const userMatch = !userFilter || entry.user.toLowerCase().includes(userFilter.toLowerCase());
    return actionMatch && userMatch;
  });

  const uniqueActions = [...new Set(log.map((e) => e.action))];

  return (
    <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <TopHeader />
        <div className="px-10 py-8">
          <h1 className="font-serif text-[38px] text-[#1B2338] leading-tight">Audit Log</h1>
          <p className="text-sm text-gray-500 mt-2">
            {usingFallback ? "Showing sample data — connect the backend for the live log." : `${filtered.length} events`}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <input
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="Filter by user"
              className="h-10 w-[220px] rounded-full border border-[#E3DDCE] px-5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#3E63C2]"
            />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-10 rounded-full border border-[#E3DDCE] px-4 text-sm bg-white focus:outline-none"
            >
              <option value="ALL">All actions</option>
              {uniqueActions.map((a) => (
                <option key={a} value={a}>{ACTION_LABELS[a] || a}</option>
              ))}
            </select>
          </div>

          <div className="bg-white border border-[#E3DDCE] rounded-lg mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr_1.2fr_3fr] px-6 py-3 border-b border-[#E3DDCE] text-[11px] uppercase tracking-[1.5px] text-gray-500">
              <span>Timestamp</span>
              <span>User</span>
              <span>Action</span>
              <span>Detail</span>
            </div>
            {loading ? (
              <div className="text-center py-16 text-gray-400 text-sm">Loading audit trail…</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                No events match these filters. Try clearing the user or action filter.
              </div>
            ) : (
              filtered.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-[1.2fr_1fr_1.2fr_3fr] px-6 py-4 border-b border-[#F0EBE0] last:border-0 items-center hover:bg-[#FAF8F2] transition-colors"
                >
                  <span className="text-sm text-gray-500 font-mono">{entry.timestamp}</span>
                  <span className="text-sm text-[#1B2338] font-semibold">{entry.user}</span>
                  <span className="text-sm text-gray-600">{ACTION_LABELS[entry.action] || entry.action}</span>
                  <span className="text-sm text-gray-600">{entry.detail}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuditLog;
