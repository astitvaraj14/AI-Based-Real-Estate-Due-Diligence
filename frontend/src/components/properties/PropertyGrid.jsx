import { FaBuilding } from "react-icons/fa";
import PropertyCard from "./PropertyCard";

function PropertyGrid({
  loading,
  properties,
  navigate,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-20">
        <div className="flex flex-col items-center justify-center">

          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

          <h3 className="mt-6 text-xl font-semibold text-slate-700">
            Loading Properties...
          </h3>

          <p className="mt-2 text-slate-500">
            Please wait while we fetch all registered properties.
          </p>

        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-20">

        <div className="flex flex-col items-center justify-center">

          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">

            <FaBuilding className="text-5xl text-slate-400" />

          </div>

          <h2 className="mt-8 text-3xl font-bold text-slate-800">
            No Properties Found
          </h2>

          <p className="mt-3 text-slate-500 text-center max-w-md">
            No properties match your current filters.
            Try changing the filters or add a new property.
          </p>

          <button
            onClick={() => navigate("/add-property")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Add Property
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">

      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default PropertyGrid;