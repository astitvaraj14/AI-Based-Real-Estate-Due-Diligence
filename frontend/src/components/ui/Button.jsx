import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",

  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",

  outline:
    "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl",

  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl",

  warning:
    "bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl",

  ghost:
    "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
};

const sizes = {
  sm: "px-3 py-2 text-sm rounded-xl",

  md: "px-5 py-3 text-base rounded-2xl",

  lg: "px-7 py-4 text-lg rounded-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300",
        "active:scale-95",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}