import clsx from "clsx";

export default function FormSelect({
  label,
  error,
  children,
  className = "",
  ...props
}) {
  return (
    <div className={clsx("space-y-2", className)}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <select
        {...props}
        className={clsx(
          "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40",
          error && "border-red-500 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900/40"
        )}
      >
        {children}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}