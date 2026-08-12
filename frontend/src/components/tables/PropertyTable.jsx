import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionCard from "../cards/SectionCard";

export default function PropertyTable({
  properties = [],
  onDelete,
}) {
  const navigate = useNavigate();

  const badgeClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "verified":
        return "bg-emerald-100 text-emerald-700";

      case "pending":
        return "bg-amber-100 text-amber-700";

      case "rejected":
        return "bg-rose-100 text-rose-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <SectionCard
      title="Recent Properties"
      subtitle="Latest registered properties"
    >
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-slate-200 dark:border-slate-800 text-left text-sm text-slate-500 dark:text-slate-400">

              <th className="py-4">Property</th>

              <th>Owner</th>

              <th>City</th>

              <th>Type</th>

              <th>Status</th>

              <th>Score</th>

              <th className="text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {properties.length === 0 && (

              <tr>

                <td
                  colSpan="7"
                  className="py-12 text-center text-slate-500"
                >
                  No properties found.
                </td>

              </tr>

            )}

            {properties.map((property) => (

              <tr
                key={property.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >

                <td className="py-5">

                  <div>

                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {property.title}
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {property.address}
                    </p>

                  </div>

                </td>

                <td>{property.ownerName}</td>

                <td>{property.city}</td>

                <td>{property.propertyType}</td>

                <td>

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${badgeClass(property.verificationStatus || "Pending")}
                    `}
                  >
                    {property.verificationStatus || "Pending"}
                  </span>

                </td>

                <td>

                  <span className="font-semibold text-slate-700">
                    {property.verificationScore != null ? `${property.verificationScore}%` : "0%"}
                  </span>

                </td>

                <td>

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        navigate(`/properties/${property.id}`)
                      }
                      className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/properties/edit/${property.id}`)
                      }
                      className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete?.(property.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </SectionCard>
  );
}