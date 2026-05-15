"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navPills = [
  { href: "/", label: "Study Mode" },
  { href: "/all-cards", label: "All Cards" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <div
      aria-label="Card view"
      className="inline-flex w-auto shrink-0 gap-1 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 p-1 shadow-[2px_3px_0_0_var(--color-brand-neutral-900)]"
      role="tablist"
    >
      {navPills.map((pill) => {
        const isActive = pathname === pill.href;

        return (
          <Link
            key={pill.href}
            aria-current={isActive ? "page" : undefined}
            aria-selected={isActive}
            className={[
              "inline-flex min-h-11 flex-none cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-3 text-preset-4 leading-none transition-[background-color,border-color,outline-color] duration-150 ease-in-out focus-visible:border-brand-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-600",
              isActive
                ? "border-brand-neutral-900 bg-brand-yellow-500 text-brand-neutral-900 hover:bg-brand-yellow-500/75"
                : "border-transparent bg-brand-neutral-0 text-brand-neutral-900 hover:border-brand-neutral-900",
            ]
              .filter(Boolean)
              .join(" ")}
            href={pill.href}
            role="tab"
          >
            <span>{pill.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
