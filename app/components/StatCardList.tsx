import type { HTMLAttributes, ReactNode } from "react";
import { StatCard } from "./StatCard";

type StatCardListItem = {
  label: ReactNode;
  value: ReactNode;
  icon: ReactNode;
  accentClassName?: string;
  iconClassName?: string;
};

type StatCardListProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  stats: StatCardListItem[];
};

export function StatCardList({
  title,
  stats,
  className = "",
  ...props
}: StatCardListProps) {
  return (
    <section
      className={[
        "rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 p-6 text-brand-neutral-900",
        "border-t border-r-[3px] border-b-[3px] border-l",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <h2 className="text-preset-2">{title}</h2>

      <div className="mt-4 flex flex-col gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={`${stat.label}-${index}`}
            accentClassName={stat.accentClassName}
            icon={stat.icon}
            iconClassName={stat.iconClassName}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
}
