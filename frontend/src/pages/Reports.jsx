// Reports.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import StatusBadge from "../components/StatusBadge";
import api from "../services/api";

const FALLBACK_REPORTS = [
  { id: 1, property: "14 Lakeview Terrace, Austin TX", type: "Full Due Diligence", generatedOn: "2026-07-14", status: "COMPLETE" },
  { id: 2, property: "402 Riverside Commons, Tampa FL", type: "Title & Lien Summary", generatedOn: "2026-07-16", status: "COMPLETE" },
  { id: 3, property: "9 Magnolia Court, Charleston SC", type: "Full Due Diligence", generatedOn: "2026-07-18", status: "IN_PROGRESS" },
  { id: 4, property: "220 Harbor Point, Seattle WA", type: "Zoning Compliance", generatedOn: "2026-07-11", status: "COMPLETE" },
];

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reports");
      setReports(res.data);
      setUsingFallback(false);
    } catch (e) {
      console.log(e);
      setReports(FALLBACK_REPORTS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await api.post("/reports/generate");
      setReports((prev) => [res.data, ...prev]);
    } catch (e) {
      console.log(e);
      alert("Couldn't reach the report service. Connect the backend to generate live reports.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async (report) => {
    try {
      const res = await api.get(`/reports/${report.id}/download`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${report.property.replace(/[^a-z0-9]/gi, "_")}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.log(e);
      alert("Download isn't available yet — this report will be downloadable once the backend is connected.");
    }
  };

  const filtered = filter === "ALL" ? reports : reports.filter((r) => r.status === filter);
  const completeCount = reports.filter((r) => r.status === "COMPLETE").length;

  return (
    <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <TopHeader />
        <div className="px-10 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-[38px] text-[#1B2338] leading-tight">Reports</h1>
              <p className="text-sm text-gray-500 mt-2">
                {usingFallback ? "Showing sample data — connect the backend for live reports." : `${completeCount} of ${reports.length} reports ready`}
              </p>
            </div>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="h-10 px-6 rounded-full bg-[#1B2338] text-white text-sm font-medium hover:bg-[#2B3450] transition-colors disabled:opacity-60"
            >
              {generating ? "Generating…" : "Generate new report"}
            </button>
          </div>

          <div className="flex gap-2 mt-6">
            {["ALL", "COMPLETE", "IN_PROGRESS"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filter === f
                    ? "bg-[#1B2338] text-white border-[#1B2338]"
                    : "bg-white text-gray-600 border-[#E3DDCE] hover:bg-[#F8F6F0]"
                }`}
              >
                {f === "ALL" ? "All" : f === "COMPLETE" ? "Complete" : "In progress"}
              </button>
            ))}
          </div>

          <div className="bg-white border border-[#E3DDCE] rounded-lg mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="grid grid-cols-[2fr_1.4fr_1fr_0.9fr_0.8fr] px-6 py-3 border-b border-[#E3DDCE] text-[11px] uppercase tracking-[1.5px] text-gray-500">
              <span>Property</span>
              <span>Report type</span>
              <span>Generated on</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {loading ? (
              <div className="text-center py-16 text-gray-400 text-sm">Loading reports…</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                No reports here yet. Generate one from a property's due diligence page.
              </div>
            ) : (
              filtered.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[2fr_1.4fr_1fr_0.9fr_0.8fr] px-6 py-4 border-b border-[#F0EBE0] last:border-0 items-center hover:bg-[#FAF8F2] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#1B2338]">{r.property}</span>
                  <span className="text-sm text-gray-600">{r.type}</span>
                  <span className="text-sm text-gray-600">{r.generatedOn}</span>
                  <StatusBadge status={r.status} />
                  <button
                    onClick={() => handleDownload(r)}
                    disabled={r.status !== "COMPLETE"}
                    className="text-sm font-medium text-[#3E63C2] hover:underline disabled:text-gray-300 disabled:no-underline text-left"
                  >
                    Download
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;
