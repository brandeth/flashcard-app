import type { ReactNode } from "react";

type ToastProps = {
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

export function Toast({ children, className = "", onClose }: ToastProps) {
  const classes = [
    "pointer-events-auto flex min-h-9 w-[calc(100vw-3rem)] max-w-[426px] items-center justify-between gap-4 rounded-[9999px] border border-brand-neutral-900 bg-brand-neutral-0 px-4 py-2 text-brand-neutral-900 shadow-[0_3px_8px_0_rgba(46,20,1,0.28),2px_2px_0_0_var(--color-brand-neutral-900)] sm:min-h-12 sm:px-6 sm:py-3",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="status"
      aria-live="polite"
      className={classes}
    >
      <span className="text-preset-5 sm:text-preset-4">{children}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onClose}
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[28px] leading-none text-brand-neutral-600 transition-colors duration-150 hover:text-brand-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
