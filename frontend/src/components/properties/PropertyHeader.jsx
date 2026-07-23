import { FaPlus } from "react-icons/fa";

function PropertyHeader({ navigate }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-600">
            Property Management
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Manage Properties
          </h1>

          <p className="mt-3 text-slate-500 text-lg">
            Add, verify, search and monitor every registered property from one
            place.
          </p>
        </div>

        <button
          onClick={() => navigate("/add-property")}
          className="flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
        >
          <FaPlus className="text-lg" />
          Add New Property
        </button>
      </div>
    </div>
  );
}

export default PropertyHeader;