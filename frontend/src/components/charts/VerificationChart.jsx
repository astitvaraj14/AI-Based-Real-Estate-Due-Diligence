import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
  } from "recharts";
  
  import SectionCard from "../cards/SectionCard";
  
  const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];
  
  export default function VerificationChart({ dashboard }) {
    const data = [
      {
        name: "Verified",
        value: dashboard?.verifiedProperties ?? 0,
      },
      {
        name: "Pending",
        value: dashboard?.pendingReviews ?? 0,
      },
      {
        name: "Rejected",
        value: dashboard?.rejectedProperties ?? 0,
      },
    ];
  
    const total =
      (dashboard?.verifiedProperties ?? 0) +
      (dashboard?.pendingReviews ?? 0) +
      (dashboard?.rejectedProperties ?? 0);
  
    const verificationRate =
      total === 0
        ? 0
        : Math.round(
            ((dashboard?.verifiedProperties ?? 0) / total) * 100
          );
  
    return (
      <SectionCard
        title="Verification Overview"
        subtitle="Current property verification statistics"
      >
        <div className="grid gap-8 lg:grid-cols-2">
  
          {/* Donut Chart */}
  
          <div className="h-72">
  
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
  
                <Pie
                  data={data}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
  
                <Tooltip />
  
              </PieChart>
            </ResponsiveContainer>
  
          </div>
  
          {/* Analytics */}
  
          <div className="space-y-5">
  
            <div className="rounded-xl border border-slate-200 p-5">
  
              <p className="text-sm text-slate-500">
                Verification Rate
              </p>
  
              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                {verificationRate}%
              </h2>
  
            </div>
  
            <div className="grid grid-cols-3 gap-4">
  
              <div className="rounded-xl bg-emerald-50 p-4">
  
                <p className="text-xs text-emerald-700">
                  Verified
                </p>
  
                <h3 className="mt-2 text-2xl font-bold text-emerald-700">
                  {dashboard?.verifiedProperties}
                </h3>
  
              </div>
  
              <div className="rounded-xl bg-amber-50 p-4">
  
                <p className="text-xs text-amber-700">
                  Pending
                </p>
  
                <h3 className="mt-2 text-2xl font-bold text-amber-700">
                  {dashboard?.pendingReviews}
                </h3>
  
              </div>
  
              <div className="rounded-xl bg-red-50 p-4">
  
                <p className="text-xs text-red-700">
                  Rejected
                </p>
  
                <h3 className="mt-2 text-2xl font-bold text-red-700">
                  {dashboard?.rejectedProperties}
                </h3>
  
              </div>
  
            </div>
  
            <div className="rounded-xl border border-slate-200 p-5">
  
              <p className="text-sm text-slate-500">
                Average Verification Score
              </p>
  
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {dashboard?.averageVerificationScore ?? 0}%
              </h2>
  
            </div>
  
          </div>
  
        </div>
      </SectionCard>
    );
  }