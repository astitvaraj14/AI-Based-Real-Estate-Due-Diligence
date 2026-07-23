import {
  Building2,
  Clock3,
  BadgeCheck,
  IndianRupee,
} from "lucide-react";

import StatCard from "../cards/StatCard";

export default function DashboardStats({ dashboard }) {
  const formatCurrency = (value) => {
    if (!value) return "₹0";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Properties"
        value={dashboard?.totalProperties ?? 0}
        icon={Building2}
        color="blue"
        subtitle="Registered properties"
      />

      <StatCard
        title="Pending Reviews"
        value={dashboard?.pendingReviews ?? 0}
        icon={Clock3}
        color="amber"
        subtitle="Awaiting verification"
      />

      <StatCard
        title="Verified"
        value={dashboard?.verifiedProperties ?? 0}
        icon={BadgeCheck}
        color="emerald"
        subtitle="Successfully verified"
      />

      <StatCard
        title="Portfolio Value"
        value={formatCurrency(dashboard?.totalPropertyValue)}
        icon={IndianRupee}
        color="rose"
        subtitle="Combined asset value"
      />

    </section>
  );
}