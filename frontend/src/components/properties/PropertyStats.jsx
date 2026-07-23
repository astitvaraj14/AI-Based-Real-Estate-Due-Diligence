import {
    Building2,
    BadgeCheck,
    Clock3,
    XCircle,
  } from "lucide-react";
  
  export default function PropertyStats({ stats }) {
    const cards = [
      {
        title: "Total Properties",
        value: stats.total,
        icon: Building2,
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      {
        title: "Verified",
        value: stats.verified,
        icon: BadgeCheck,
        color: "text-green-600",
        bg: "bg-green-100",
      },
      {
        title: "Pending",
        value: stats.pending,
        icon: Clock3,
        color: "text-amber-600",
        bg: "bg-amber-100",
      },
      {
        title: "Rejected",
        value: stats.rejected,
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100",
      },
    ];
  
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
  
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
  
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>
  
                  <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    {card.value}
                  </h2>
                </div>
  
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center ${card.bg}`}
                >
                  <Icon
                    size={28}
                    className={card.color}
                  />
                </div>
  
              </div>
            </div>
          );
        })}
      </section>
    );
  }