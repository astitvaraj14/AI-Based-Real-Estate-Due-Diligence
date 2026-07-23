// components/StatusBadge.jsx
const STYLES = {
  CLEAR: "bg-green-100 text-green-700",
  REVIEW: "bg-yellow-100 text-yellow-700",
  FLAGGED: "bg-red-100 text-red-700",
  PENDING: "bg-gray-100 text-gray-600",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETE: "bg-green-100 text-green-700",
};

const LABELS = {
  IN_PROGRESS: "IN PROGRESS",
};

function StatusBadge({ status }) {
  const cls = STYLES[status] || "bg-gray-100 text-gray-600";
  const label = LABELS[status] || status;
  return (
    <span className={`inline-block w-fit px-3 py-1 rounded-full text-[11px] font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default StatusBadge;
