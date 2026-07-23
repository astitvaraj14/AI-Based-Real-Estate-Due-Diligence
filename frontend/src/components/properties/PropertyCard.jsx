import {
    FaMapMarkerAlt,
    FaHome,
    FaUser,
    FaRupeeSign,
    FaExpandArrowsAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaEye,
    FaEdit,
    FaTrash,
  } from "react-icons/fa";
  
  function PropertyCard({
    property,
    onView,
    onEdit,
    onDelete,
  }) {
  
    const statusColor = () => {
  
      if (!property.verificationStatus)
        return "bg-gray-100 text-gray-700";
  
      switch (property.verificationStatus.toLowerCase()) {
  
        case "verified":
          return "bg-green-100 text-green-700";
  
        case "pending":
          return "bg-yellow-100 text-yellow-700";
  
        case "rejected":
          return "bg-red-100 text-red-700";
  
        default:
          return "bg-blue-100 text-blue-700";
      }
    };
  
    const statusIcon = () => {
  
      if (!property.verificationStatus)
        return <FaClock />;
  
      switch (property.verificationStatus.toLowerCase()) {
  
        case "verified":
          return <FaCheckCircle />;
  
        case "rejected":
          return <FaTimesCircle />;
  
        default:
          return <FaClock />;
      }
    };
  
    return (
  
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
  
        {/* Top Banner */}
  
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3"></div>
  
        {/* Header */}
  
        <div className="p-6">
  
          <div className="flex justify-between items-start">
  
            <div>
  
              <h2 className="text-2xl font-bold text-slate-800">
                {property.title}
              </h2>
  
              <div className="flex items-center gap-2 text-slate-500 mt-3">
  
                <FaMapMarkerAlt className="text-blue-600" />
  
                <span>
                  {property.city}, {property.state}
                </span>
  
              </div>
  
            </div>
  
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusColor()}`}
            >
  
              {statusIcon()}
  
              {property.verificationStatus || "Pending"}
  
            </div>
  
          </div>
  
        </div>
  
        {/* Details */}
  
        <div className="px-6 pb-6">
  
          <div className="grid grid-cols-2 gap-5">
  
            <div className="bg-slate-50 rounded-2xl p-4">
  
              <div className="flex items-center gap-3">
  
                <FaHome className="text-blue-600 text-lg" />
  
                <div>
  
                  <p className="text-xs text-slate-500">
                    Property Type
                  </p>
  
                  <p className="font-semibold">
                    {property.propertyType}
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
            <div className="bg-slate-50 rounded-2xl p-4">
  
              <div className="flex items-center gap-3">
  
                <FaUser className="text-blue-600 text-lg" />
  
                <div>
  
                  <p className="text-xs text-slate-500">
                    Owner
                  </p>
  
                  <p className="font-semibold">
                    {property.ownerName}
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
            <div className="bg-slate-50 rounded-2xl p-4">
  
              <div className="flex items-center gap-3">
  
                <FaExpandArrowsAlt className="text-blue-600 text-lg" />
  
                <div>
  
                  <p className="text-xs text-slate-500">
                    Area
                  </p>
  
                  <p className="font-semibold">
                    {property.area} Sq.ft
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
            <div className="bg-slate-50 rounded-2xl p-4">
  
              <div className="flex items-center gap-3">
  
                <FaRupeeSign className="text-green-600 text-lg" />
  
                <div>
  
                  <p className="text-xs text-slate-500">
                    Price
                  </p>
  
                  <p className="font-bold text-green-700">
                    ₹ {property.price?.toLocaleString()}
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
          {/* Verification Score */}
  
          <div className="mt-8">
  
            <div className="flex justify-between mb-2">
  
              <p className="font-semibold text-slate-700">
                Verification Score
              </p>
  
              <p className="font-bold text-blue-600">
                {property.verificationScore || 0}%
              </p>
  
            </div>
  
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
  
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${property.verificationScore || 0}%`,
                }}
              />
  
            </div>
  
          </div>
  
        </div>
  
        {/* Footer */}
  
        <div className="border-t border-slate-200 p-6">
  
          <div className="grid grid-cols-3 gap-3">
  
            <button
              onClick={() => onView(property.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
            >
              <div className="flex justify-center items-center gap-2">
                <FaEye />
                View
              </div>
            </button>
  
            <button
              onClick={() => onEdit(property.id)}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3 font-semibold transition"
            >
              <div className="flex justify-center items-center gap-2">
                <FaEdit />
                Edit
              </div>
            </button>
  
            <button
              onClick={() => onDelete(property.id)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold transition"
            >
              <div className="flex justify-center items-center gap-2">
                <FaTrash />
                Delete
              </div>
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    );
  }
  
  export default PropertyCard;