import clsx from "clsx";

/* ---------------------------- */
/* Spinner Loader               */
/* ---------------------------- */

export function Spinner({
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-blue-600 border-t-transparent",
        sizes[size],
        className
      )}
    />
  );
}

/* ---------------------------- */
/* Full Page Loader             */
/* ---------------------------- */

export function FullPageLoader({
  title = "Loading...",
  subtitle = "Please wait while we fetch your data.",
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">

      <Spinner size="lg" />

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}

/* ---------------------------- */
/* Dashboard Stat Skeleton       */
/* ---------------------------- */

export function StatsSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="h-4 w-28 rounded bg-slate-200" />

      <div className="mt-6 h-10 w-24 rounded bg-slate-200" />

      <div className="mt-8 h-3 w-36 rounded bg-slate-200" />

    </div>
  );
}

/* ---------------------------- */
/* Property Card Skeleton        */
/* ---------------------------- */

export function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      <div className="h-3 bg-slate-200" />

      <div className="p-6">

        <div className="h-6 w-48 rounded bg-slate-200" />

        <div className="mt-4 h-4 w-32 rounded bg-slate-200" />

        <div className="mt-8 grid grid-cols-2 gap-4">

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-slate-100 p-4"
            >
              <div className="h-4 w-20 rounded bg-slate-200" />

              <div className="mt-3 h-5 w-24 rounded bg-slate-200" />
            </div>
          ))}

        </div>

        <div className="mt-8 h-3 rounded bg-slate-200" />

      </div>

      <div className="border-t border-slate-200 p-5">

        <div className="grid grid-cols-3 gap-3">

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-11 rounded-xl bg-slate-200"
            />
          ))}

        </div>

      </div>

    </div>
  );
}

/* ---------------------------- */
/* Table Skeleton               */
/* ---------------------------- */

export function TableSkeleton({
  rows = 5,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="animate-pulse">

        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-5 border-b p-5"
          >
            <div className="h-12 w-12 rounded-full bg-slate-200" />

            <div className="flex-1">

              <div className="h-5 w-48 rounded bg-slate-200" />

              <div className="mt-3 h-4 w-28 rounded bg-slate-200" />

            </div>

            <div className="h-8 w-24 rounded-full bg-slate-200" />

          </div>
        ))}

      </div>

    </div>
  );
}

/* ---------------------------- */
/* Default Loader               */
/* ---------------------------- */

export default Spinner;