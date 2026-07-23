import {
    FaFilter,
    FaSearch,
    FaSyncAlt,
  } from "react-icons/fa";
  
  function FilterPanel({
    city,
    setCity,
    type,
    setType,
    min,
    setMin,
    max,
    setMax,
    searchProperties,
    resetFilters,
  }) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
  
        {/* Header */}
  
        <div className="flex items-center justify-between mb-6">
  
          <div>
  
            <h2 className="text-2xl font-bold text-slate-800">
              Search Properties
            </h2>
  
            <p className="text-slate-500 mt-1">
              Filter properties by city, type and price.
            </p>
  
          </div>
  
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
  
            <FaFilter className="text-blue-600 text-xl" />
  
          </div>
  
        </div>
  
        {/* Filters */}
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
  
          {/* City */}
  
          <div>
  
            <label className="text-sm font-semibold text-slate-600">
              City
            </label>
  
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Bengaluru"
              className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
  
          </div>
  
          {/* Property Type */}
  
          <div>
  
            <label className="text-sm font-semibold text-slate-600">
              Property Type
            </label>
  
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Apartment"
              className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
  
          </div>
  
          {/* Min */}
  
          <div>
  
            <label className="text-sm font-semibold text-slate-600">
              Min Price
            </label>
  
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="0"
              className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
  
          </div>
  
          {/* Max */}
  
          <div>
  
            <label className="text-sm font-semibold text-slate-600">
              Max Price
            </label>
  
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="5000000"
              className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
  
          </div>
  
          {/* Buttons */}
  
          <div className="flex items-end gap-3">
  
            <button
              onClick={searchProperties}
              className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 font-semibold transition"
            >
              <FaSearch />
              Search
            </button>
  
            <button
              onClick={resetFilters}
              className="w-11 h-11 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition"
            >
              <FaSyncAlt />
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default FilterPanel;