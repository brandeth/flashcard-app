import type { HTMLAttributes } from "react";

type ProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, "aria-valuemax"> & {
  value: number;
  max?: number;
  label?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label = "Progress",
  className = "",
  ...props
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = Math.min(Math.max(value, 0), safeMax);
  const percent = (clampedValue / safeMax) * 100;

  return (
    <div
      aria-label={label}
      aria-valuemax={safeMax}
      aria-valuemin={0}
      aria-valuenow={clampedValue}
      className={[
        "h-2 w-[60px] overflow-hidden rounded-full border border-brand-neutral-900 bg-brand-neutral-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="progressbar"
      {...props}
    >
      <div
        className="h-full rounded-full bg-brand-neutral-900 transition-[width] duration-150 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
