import type { HTMLAttributes, ReactNode } from "react";

type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
  icon: ReactNode;
  accentClassName?: string;
  iconClassName?: string;
};

export function StatCard({
  label,
  value,
  icon,
  accentClassName = "bg-brand-blue-400",
  iconClassName = "text-brand-neutral-900",
  className = "",
  ...props
}: StatCardProps) {
  return (
    <div
      className={[
        "grid min-h-[120px] w-full overflow-hidden rounded-xl border-brand-neutral-900 text-brand-neutral-900",
        "border-t border-r-2 border-b-2 border-l",
        "grid-cols-[minmax(0,1fr)_98px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="flex min-w-0 flex-col justify-center bg-brand-neutral-0 px-5 py-4">
        <p className="text-preset-4">{label}</p>
        <p className="mt-4 text-[2.5rem] leading-none font-bold tracking-normal">
          {value}
        </p>
      </div>

      <div
        className={[
          "flex items-center justify-center border-l border-brand-neutral-900",
          accentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "inline-flex size-7 items-center justify-center [&_svg]:size-full",
            iconClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}
