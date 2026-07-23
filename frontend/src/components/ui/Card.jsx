import clsx from "clsx";

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "p-6",
  rounded = "rounded-3xl",
  shadow = true,
  border = true,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white transition-all duration-300",

        border && "border border-slate-200",

        shadow && "shadow-sm",

        hover &&
          "cursor-pointer hover:-translate-y-1 hover:shadow-2xl",

        rounded,

        padding,

        className
      )}
    >
      {children}
    </div>
  );
}