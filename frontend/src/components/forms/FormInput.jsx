import clsx from "clsx";

export default function FormInput({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={clsx("space-y-2", className)}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className={clsx(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          error && "border-red-500 focus:ring-red-100"
        )}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}