import { X } from "lucide-react";
import { useEffect } from "react";
import clsx from "clsx";

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => closeOnOverlay && onClose?.()}
      />

      {/* Modal */}

      <div
        className={clsx(
          "relative mx-4 w-full overflow-hidden rounded-[28px] bg-white shadow-2xl animate-[fadeIn_.25s_ease]",
          sizes[size]
        )}
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b border-slate-200 px-8 py-6">

          <div>

            {title && (
              <h2 className="text-2xl font-bold text-slate-900">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-2 text-slate-500">
                {subtitle}
              </p>
            )}

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="px-8 py-7">
          {children}
        </div>

        {/* Footer */}

        {footer && (
          <div className="flex justify-end gap-3 border-t border-slate-200 px-8 py-5 bg-slate-50">
            {footer}
          </div>
        )}

      </div>

    </div>
  );
}