// Comparables.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import api from "../services/api";

const FALLBACK_SUBJECT = { title: "14 Lakeview Terrace, Austin TX", value: 482000, sqft: 2100, pricePerSqft: 230 };
const FALLBACK_COMPS = [
  { id: 1, title: "22 Lakeview Terrace, Austin TX", distance: "0.2 mi", soldOn: "2026-05-02", value: 471000, sqft: 2050, pricePerSqft: 230 },
  { id: 2, title: "8 Cedar Ridge Rd, Austin TX", distance: "0.6 mi", soldOn: "2026-04-18", value: 505000, sqft: 2200, pricePerSqft: 230 },
  { id: 3, title: "115 Willow Bend Dr, Austin TX", distance: "0.9 mi", soldOn: "2026-06-10", value: 460000, sqft: 1980, pricePerSqft: 232 },
  { id: 4, title: "3 Meadowbrook Ct, Austin TX", distance: "1.1 mi", soldOn: "2026-03-27", value: 495000, sqft: 2150, pricePerSqft: 230 },
];

function Comparables() {
  const [subject, setSubject] = useState(null);
  const [comps, setComps] = useState([]);
  const [radius, setRadius] = useState("1");
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchComps = async () => {
    setLoading(true);
    try {
      const res = await api.get("/comparables", { params: { radius } });
      setSubject(res.data.subject);
      setComps(res.data.comparables);
      setUsingFallback(false);
    } catch (e) {
      console.log(e);
      setSubject(FALLBACK_SUBJECT);
      setComps(FALLBACK_COMPS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius]);

  const avgValue = comps.length
    ? Math.round(comps.reduce((sum, c) => sum + c.value, 0) / comps.length)
    : 0;
  const variance = subject && avgValue ? Math.round(((subject.value - avgValue) / avgValue) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <TopHeader />
        <div className="px-10 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-[38px] text-[#1B2338] leading-tight">Comparables</h1>
              <p className="text-sm text-gray-500 mt-2">
                {usingFallback ? "Showing sample data — connect the backend for live comps." : `${comps.length} comparable properties`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[11px] uppercase tracking-[1.5px] text-gray-500">Radius</label>
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="h-10 rounded-full border border-[#E3DDCE] px-4 text-sm bg-white focus:outline-none"
              >
                <option value="0.5">0.5 mi</option>
                <option value="1">1 mi</option>
                <option value="2">2 mi</option>
                <option value="5">5 mi</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Loading comparables…</div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-5 mt-8">
                <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Subject property</p>
                  <h2 className="text-lg mt-3 text-[#1B2338] font-semibold">{subject?.title}</h2>
                  <p className="text-[34px] mt-3 text-[#1B2338]">${subject?.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{subject?.sqft.toLocaleString()} sqft · ${subject?.pricePerSqft}/sqft</p>
                </div>
                <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Average comp value</p>
                  <h2 className="text-[34px] mt-5 text-[#1B2338]">${avgValue.toLocaleString()}</h2>
                  <p className="text-xs text-gray-500 mt-1">Across {comps.length} nearby sales</p>
                </div>
                <div className="bg-white border border-[#E3DDCE] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <p className="text-[11px] uppercase tracking-[2px] text-gray-500">Variance from average</p>
                  <h2 className={`text-[34px] mt-5 ${variance >= 0 ? "text-[#4D7B73]" : "text-[#B45B46]"}`}>
                    {variance >= 0 ? "+" : ""}{variance}%
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {variance >= 0 ? "Above" : "Below"} comparable market value
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E3DDCE] rounded-lg mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="grid grid-cols-[2fr_0.8fr_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-[#E3DDCE] text-[11px] uppercase tracking-[1.5px] text-gray-500">
                  <span>Property</span>
                  <span>Distance</span>
                  <span>Sold on</span>
                  <span>Sale value</span>
                  <span>Sqft</span>
                  <span>$/sqft</span>
                </div>
                {comps.length === 0 ? (
                  <div className="text-center py-16 text-gray-500 text-sm">
                    No comparable sales found within this radius. Try widening the search.
                  </div>
                ) : (
                  comps.map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-[2fr_0.8fr_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-[#F0EBE0] last:border-0 items-center hover:bg-[#FAF8F2] transition-colors"
                    >
                      <span className="font-semibold text-sm text-[#1B2338]">{c.title}</span>
                      <span className="text-sm text-gray-600">{c.distance}</span>
                      <span className="text-sm text-gray-600">{c.soldOn}</span>
                      <span className="text-sm text-gray-600">${c.value.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">{c.sqft.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">${c.pricePerSqft}</span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Comparables;
