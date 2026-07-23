// DueDiligence.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import api from "../services/api";

const FALLBACK_RECORD = {
  title: "402 Riverside Commons, Tampa FL",
  parcel: "TF-0871",
  listedValue: "$1.24M",
  propertyType: "Commercial",
  generated: "Jul 2026",
  sections: [
    { key: "ownership", title: "Ownership Records", status: "CLEAR", summary: "One late payment recorded in 2022, resolved within 60 days." },
    { key: "tax", title: "Property Tax History", status: "REVIEW", summary: "One late payment recorded in 2022, resolved within 60 days." },
    { key: "zoning", title: "Zoning & Compliance", status: "CLEAR", summary: "Zoned C-2 Commercial, current use fully compliant." },
    { key: "flood", title: "Flood Zone Status", status: "FLAGGED", summary: "FEMA Zone AE — annual flood insurance required." },
    { key: "permits", title: "Permit History", status: "CLEAR", summary: "All renovations since 2018 permitted and closed out." },
    { key: "environmental", title: "Environmental Records", status: "REVIEW", summary: "Adjacent lot flagged for legacy soil testing, 2011." },
  ],
  comparables: ["390 Riverside Commons", "55 Bayshore Ave", "18 Dockside Row"],
  timeline: [
    { event: "Environmental records retrieved", timestamp: "06 Jul 2026 — 09:42" },
    { event: "Flood zone flagged for review", timestamp: "06 Jul 2026 — 09:42" },
    { event: "Tax history synced from county records", timestamp: "06 Jul 2026 — 09:42" },
  ],
};

const BADGE_STYLES = {
  CLEAR: "bg-green-100 text-green-700",
  REVIEW: "bg-yellow-100 text-yellow-700",
  FLAGGED: "bg-red-100 text-red-700",
};

function SectionBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.5px] ${BADGE_STYLES[status]}`}>
      {status}
    </span>
  );
}

function DueDiligence() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [exporting, setExporting] = useState(null);

  const fetchRecord = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/due-diligence/${id || "latest"}`);
      setRecord(res.data);
      setUsingFallback(false);
    } catch (e) {
      console.log(e);
      setRecord(FALLBACK_RECORD);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleExport = async (format) => {
    setExporting(format);
    try {
      const res = await api.get(`/due-diligence/${id || "latest"}/export`, {
        params: { format },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `due-diligence.${format === "excel" ? "xlsx" : "pdf"}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.log(e);
      alert(`Export isn't available yet — this will be downloadable once the backend is connected.`);
    } finally {
      setExporting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFEAE0]">
        <Sidebar />
        <main className="ml-[220px]">
          <TopHeader />
          <div className="text-center py-24 text-gray-400 text-sm">Loading due diligence record…</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <TopHeader />
        <div className="px-10 py-8">
          <p className="text-sm text-gray-500 mb-4">
            {usingFallback && "Showing sample data — connect the backend for live records."}
          </p>

          {/* Hero */}
          <div className="bg-[#1B2338] rounded-lg p-8">
            <h1 className="font-serif text-[32px] text-white leading-tight">{record.title}</h1>
            <div className="grid grid-cols-4 gap-8 mt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400">Parcel ID</p>
                <p className="text-white font-semibold mt-1">{record.parcel}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400">Listed value</p>
                <p className="text-white font-semibold mt-1">{record.listedValue}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400">Property type</p>
                <p className="text-white font-semibold mt-1">{record.propertyType}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400">Generated</p>
                <p className="text-white font-semibold mt-1">{record.generated}</p>
              </div>
            </div>
          </div>

          {/* Section cards */}
          <div className="grid grid-cols-3 gap-5 mt-6">
            {record.sections.map((s) => (
              <div
                key={s.key}
                className="bg-white border border-[#E3DDCE] rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm text-[#1B2338]">{s.title}</h3>
                  <SectionBadge status={s.status} />
                </div>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">{s.summary}</p>
              </div>
            ))}
          </div>

          {/* Comparables + timeline */}
          <div className="grid grid-cols-3 gap-5 mt-6">
            <div className="col-span-2 bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h2 className="text-lg font-semibold text-[#1B2338] mb-4">Comparable Properties</h2>
              <div className="space-y-3">
                {record.comparables.map((c, i) => (
                  <p key={i} className="font-semibold text-sm text-[#1B2338]">{c}</p>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-[#1B2338] mt-8 mb-4">Export Report</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => handleExport("pdf")}
                  disabled={exporting === "pdf"}
                  className="h-11 px-8 rounded bg-[#C77B6C] text-white text-sm font-semibold tracking-[1px] hover:bg-[#B96B5C] transition-colors disabled:opacity-60"
                >
                  {exporting === "pdf" ? "PREPARING…" : "DOWNLOAD"}
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  disabled={exporting === "excel"}
                  className="h-11 px-8 rounded bg-[#C9C4B6] text-white text-sm font-semibold tracking-[1px] hover:bg-[#B9B4A6] transition-colors disabled:opacity-60"
                >
                  {exporting === "excel" ? "PREPARING…" : "EXPORT EXCEL"}
                </button>
              </div>
            </div>

            <div className="bg-[#F3EFE3] border border-[#E3DDCE] rounded-lg p-6">
              <h2 className="text-[11px] uppercase tracking-[1.5px] text-gray-500 font-semibold mb-5">
                Report Timeline
              </h2>
              <div className="space-y-5">
                {record.timeline.map((t, i) => (
                  <div key={i} className="pb-4 border-b border-[#E3DDCE] last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-[#1B2338]">{t.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/property-search")}
            className="text-sm text-[#3E63C2] hover:underline mt-6"
          >
            ← Back to property search
          </button>
        </div>
      </main>
    </div>
  );
}

export default DueDiligence;
