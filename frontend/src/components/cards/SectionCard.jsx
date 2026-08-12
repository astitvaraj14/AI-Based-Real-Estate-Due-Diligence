import { motion } from "framer-motion";
import clsx from "clsx";

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={clsx(
        "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors",
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5">

          <div>

            {title && (
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}

          </div>

          {action && (
            <div>
              {action}
            </div>
          )}

        </div>
      )}

      <div className="p-6">
        {children}
      </div>

    </motion.section>
  );
}