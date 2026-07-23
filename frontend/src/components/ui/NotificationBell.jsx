import { Bell } from "lucide-react";

export default function NotificationBell({
  count = 0,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        active:scale-95
      "
    >
      <Bell
        size={22}
        className="text-slate-700"
      />

      {count > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-[20px]
            items-center
            justify-center
            rounded-full
            bg-red-500
            px-1
            text-[10px]
            font-bold
            text-white
          "
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}