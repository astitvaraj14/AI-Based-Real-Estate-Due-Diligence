import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
}) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-100",
    },

    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      border: "border-emerald-100",
    },

    amber: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      border: "border-amber-100",
    },

    rose: {
      bg: "bg-rose-50",
      icon: "text-rose-600",
      border: "border-rose-100",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        rounded-2xl
        border
        ${theme.border}
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-lg
      `}
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

              <TrendingUp
                size={16}
                className="text-emerald-500"
              />

              {subtitle}

            </div>
          )}

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${theme.bg}
          `}
        >
          {Icon && (
            <Icon
              size={28}
              className={theme.icon}
            />
          )}
        </div>

      </div>
    </motion.div>
  );
}