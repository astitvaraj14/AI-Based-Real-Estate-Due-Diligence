// PropertySearch.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import StatusBadge from "../components/StatusBadge";
import api from "../services/api";

const FALLBACK_RESULTS = [
  {
    id: 1,
    title: "14 Lakeview Terrace, Austin TX",
    parcel: "AAT-2291",
    type: "Residential",
    owner: "M. Sanders",
    status: "CLEAR",
  },
  {
    id: 2,
    title: "402 Riverside Commons, Tampa FL",
    parcel: "ATF-0871",
    type: "Commercial",
    owner: "Riverside Holdings LLC",
    status: "REVIEW",
  },
  {
    id: 3,
    title: "9 Magnolia Court, Charleston SC",
    parcel: "ACT-2291",
    type: "Residential",
    owner: "J. Whitfield",
    status: "FLAGGED",
  },
  {
    id: 4,
    title: "220 Harbor Point, Seattle WA",
    parcel: "ASE-1183",
    type: "Residential",
    owner: "Harbor Point Trust",
    status: "CLEAR",
  },
  {
    id: 5,
    title: "77 Industrial Way, Denver CO",
    parcel: "ADI-4402",
    type: "Industrial",
    owner: "Summit Logistics Inc.",
    status: "CLEAR",
  },
];

function PropertySearch() {
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchResults = async () => {
    setLoading(true);

    try {
      let response;

      if (propertyType !== "ALL") {
        response = await api.get(`/properties/type/${propertyType}`);
      } else if (query.trim() !== "") {
        // Backend currently supports city search only
        response = await api.get(`/properties/city/${query.trim()}`);
      } else {
        response = await api.get("/properties");
      }

      const mappedResults = (response.data || []).map((property) => ({
        ...property,

        // Keep UI field names unchanged
        title: property.title,
        parcel: property.parcel ?? "N/A",
        type: property.propertyType,
        owner: property.ownerName,
        status: property.verificationStatus,
      }));

      setResults(mappedResults);
      setUsingFallback(false);
    } catch (error) {
      console.error(error);

      setResults(FALLBACK_RESULTS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  const filtered = results.filter((r) => {
    const search = query.toLowerCase();

    const searchMatch =
      search === "" ||
      (r.title || "").toLowerCase().includes(search) ||
      (r.owner || "").toLowerCase().includes(search) ||
      (r.address || "").toLowerCase().includes(search) ||
      (r.city || "").toLowerCase().includes(search);

    const typeMatch =
      propertyType === "ALL" || r.type === propertyType;

    const statusMatch =
      status === "ALL" || r.status === status;

    return searchMatch && typeMatch && statusMatch;
  });

  return (
       <div className="min-h-screen bg-[#EFEAE0]">
      <Sidebar />
      <main className="ml-[220px]">
        <TopHeader />
        <div className="px-10 py-8">
          <h1 className="font-serif text-[38px] text-[#1B2338] leading-tight">
            Property Search
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            {usingFallback
              ? "Showing sample data — connect the backend to search live records."
              : `${filtered.length} results`}
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#E3DDCE] rounded-lg p-6 mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-wrap gap-4 items-end"
          >
            <div className="flex-1 min-w-[240px]">
              <label className="text-[11px] uppercase tracking-[1.5px] text-gray-500">
                Address, parcel ID, or owner
              </label>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-10 mt-1.5 rounded-full border border-[#E3DDCE] px-5 text-sm bg-[#F8F6F0] focus:outline-none focus:ring-1 focus:ring-[#3E63C2]"
                placeholder="Search by city, address or owner"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[1.5px] text-gray-500">
                Property type
              </label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-[160px] h-10 mt-1.5 rounded-full border border-[#E3DDCE] px-4 text-sm bg-[#F8F6F0] focus:outline-none"
              >
                <option value="ALL">All types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[1.5px] text-gray-500">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-[140px] h-10 mt-1.5 rounded-full border border-[#E3DDCE] px-4 text-sm bg-[#F8F6F0] focus:outline-none"
              >
                <option value="ALL">All statuses</option>
                <option value="CLEAR">Clear</option>
                <option value="REVIEW">Review</option>
                <option value="FLAGGED">Flagged</option>
              </select>
            </div>

            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#1B2338] text-white text-sm font-medium hover:bg-[#2B3450] transition-colors"
            >
              Search
            </button>
          </form>

          <div className="bg-white border border-[#E3DDCE] rounded-lg mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="grid grid-cols-[2.2fr_1fr_1fr_1.4fr_0.9fr] px-6 py-3 border-b border-[#E3DDCE] text-[11px] uppercase tracking-[1.5px] text-gray-500">
              <span>Property</span>
              <span>Parcel ID</span>
              <span>Type</span>
              <span>Owner of record</span>
              <span>Status</span>
            </div>

            {loading ? (
              <div className="text-center py-16 text-gray-400 text-sm">
                Loading properties…
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                No properties match your search. Try a different address,
                parcel ID, or filter.
              </div>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="w-full text-left grid grid-cols-[2.2fr_1fr_1fr_1.4fr_0.9fr] px-6 py-4 border-b border-[#F0EBE0] last:border-0 hover:bg-[#FAF8F2] transition-colors items-center"
                >
                  <span className="font-semibold text-sm text-[#1B2338]">
                    {p.title}
                  </span>

                  <span className="text-sm text-gray-600">
                    #{p.parcel}
                  </span>

                  <span className="text-sm text-gray-600">
                    {p.type}
                  </span>

                  <span className="text-sm text-gray-600">
                    {p.owner}
                  </span>

                  <StatusBadge status={p.status} />
                </button>
              ))
            )}
          </div>
        </div>
      </main>
            {selected && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-[440px] p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <h2 className="font-serif text-2xl text-[#1B2338]">
                {selected.title}
              </h2>

              <StatusBadge status={selected.status} />
            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400">Parcel ID:</span>{" "}
                #{selected.parcel}
              </p>

              <p>
                <span className="text-gray-400">Type:</span>{" "}
                {selected.type}
              </p>

              <p>
                <span className="text-gray-400">Owner of record:</span>{" "}
                {selected.owner}
              </p>

              {/* Extra backend fields (shown only if available) */}

              {selected.address && (
                <p>
                  <span className="text-gray-400">Address:</span>{" "}
                  {selected.address}
                </p>
              )}

              {selected.city && (
                <p>
                  <span className="text-gray-400">City:</span>{" "}
                  {selected.city}
                </p>
              )}

              {selected.state && (
                <p>
                  <span className="text-gray-400">State:</span>{" "}
                  {selected.state}
                </p>
              )}

              {selected.price != null && (
                <p>
                  <span className="text-gray-400">Price:</span>{" "}
                  ₹{selected.price}
                </p>
              )}

              {selected.area != null && (
                <p>
                  <span className="text-gray-400">Area:</span>{" "}
                  {selected.area}
                </p>
              )}

              {selected.verificationScore != null && (
                <p>
                  <span className="text-gray-400">
                    Verification Score:
                  </span>{" "}
                  {selected.verificationScore}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 h-10 rounded-full bg-[#1B2338] text-white text-sm font-medium hover:bg-[#2B3450]"
              >
                Start due diligence
              </button>

              <button
                onClick={() => setSelected(null)}
                className="h-10 px-5 rounded-full border border-[#E3DDCE] text-sm text-gray-600 hover:bg-[#F8F6F0]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertySearch;