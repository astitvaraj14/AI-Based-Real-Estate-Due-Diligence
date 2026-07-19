// RiskMonitoring.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import StatusBadge from "../components/StatusBadge";
import api from "../services/api";

const FALLBACK_ALERTS = [
  { id: 1, property: "9 Magnolia Court, Charleston SC", riskScore: 78, reason: "New lien filed against title", detectedOn: "2026-07-18", status: "FLAGGED" },
  { id: 2, property: "402 Riverside Commons, Tampa FL", riskScore: 46, reason: "Zoning variance under review", detectedOn: "2026-07-16", status: "REVIEW" },
  { id: 3, property: "77 Industrial Way, Denver CO", riskScore: 22, reason: "Routine annual re-check", detectedOn: "2026-07-10", status: "CLEAR" },
  { id: 4, property: "220 Harbor Point, Seattle WA", riskScore: 18, reason: "Flood zone designation confirmed unchanged", detectedOn: "2026-07-05", status: "CLEAR" },
];

function riskColor(score) {
  if (score >= 60) return "#B45B46";
  if (score >= 35) return "#C89546";
  return "#4D7B73";
}

function RiskMonitoring() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [sortBy, setSortBy] = useState("riskScore");

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/risk-monitoring");
      setAlerts(res.data);
      setUsingFallback(false);
    } catch (e) {
      console.log(e);
      setAlerts(FALLBACK_ALERTS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const sorted = [...alerts].sort((a, b) =>
    sortBy === "riskScore" ? b.riskScore - a.riskScore : new Date(b.detectedOn) - new Date(a.detectedOn)
  );

  const flaggedCount = alerts.filter((a) => a.status === "FLAGGED").length;
  const avgRisk = alerts.length
    ? Math.round(alerts.reduce((sum, a) => sum + a.riskScore, 0) / alerts.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <TopHeader />
        <div className="px-10 py-8">
          <h1 className="font-serif text-[38px] text-[#1B2338] leading-tight">Risk Monitoring</h1>
          <p className="text-sm text-gray-500 mt-2">
            {usingFallback ? "Showing sample data — connect the backend for live monitoring." : `${flaggedCount} properties flagged for attention`}
          </p>

          <div className="grid grid-cols-3 gap-5 mt-8">
            <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Properties monitored</p>
              <h2 className="text-[34px] mt-5 text-[#1B2338]">{alerts.length}</h2>
            </div>
            <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Flagged this week</p>
              <h2 className="text-[34px] mt-5 text-[#B45B46]">{flaggedCount}</h2>
            </div>
            <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Average risk score</p>
              <h2 className="text-[34px] mt-5 text-[#1B2338]">{avgRisk}/100</h2>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 rounded-full border border-[#E3DDCE] px-4 text-xs bg-white focus:outline-none"
            >
              <option value="riskScore">Sort by risk score</option>
              <option value="detectedOn">Sort by most recent</option>
            </select>
          </div>

          <div className="bg-white border border-[#E3DDCE] rounded-lg mt-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="grid grid-cols-[1.8fr_1fr_2fr_1fr_0.9fr] px-6 py-3 border-b border-[#E3DDCE] text-[11px] uppercase tracking-[1.5px] text-gray-500">
              <span>Property</span>
              <span>Risk score</span>
              <span>Reason flagged</span>
              <span>Detected on</span>
              <span>Status</span>
            </div>
            {loading ? (
              <div className="text-center py-16 text-gray-400 text-sm">Loading risk alerts…</div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                No active alerts. Monitored properties will appear here as risk signals are detected.
              </div>
            ) : (
              sorted.map((a) => (
                <div
                  key={a.id}
                  className="grid grid-cols-[1.8fr_1fr_2fr_1fr_0.9fr] px-6 py-4 border-b border-[#F0EBE0] last:border-0 items-center hover:bg-[#FAF8F2] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#1B2338]">{a.property}</span>
                  <span className="flex items-center gap-2">
                    <span className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${a.riskScore}%`, backgroundColor: riskColor(a.riskScore) }}
                      />
                    </span>
                    <span className="text-sm text-gray-600">{a.riskScore}</span>
                  </span>
                  <span className="text-sm text-gray-600">{a.reason}</span>
                  <span className="text-sm text-gray-600">{a.detectedOn}</span>
                  <StatusBadge status={a.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RiskMonitoring;
