"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type CategoryOption = {
  label: string;
  count: number;
};

type CategoryDropdownProps = {
  categories?: CategoryOption[];
  label?: ReactNode;
  menuLabel?: string;
  selectedCategories?: Set<string>;
  onSelectedCategoriesChange?: (categories: Set<string>) => void;
};

const defaultCategories: CategoryOption[] = [
  { label: "Art", count: 1 },
  { label: "CSS", count: 6 },
  { label: "Geography", count: 4 },
  { label: "History", count: 1 },
  { label: "HTML", count: 3 },
  { label: "JavaScript", count: 14 },
  { label: "Literature", count: 1 },
  { label: "Mathematics", count: 1 },
  { label: "Programming Concepts", count: 1 },
  { label: "Science", count: 3 },
  { label: "Web Development", count: 5 },
];

function ChevronDownIcon({ isOpen }: Readonly<{ isOpen: boolean }>) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={[
        "size-4 transition-transform duration-150",
        isOpen ? "rotate-180" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function CategoryDropdown({
  categories = defaultCategories,
  label = "All Categories",
  menuLabel = "Filter flashcards by category",
  selectedCategories,
  onSelectedCategoriesChange,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedCategories, setInternalSelectedCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeSelectedCategories =
    selectedCategories ?? internalSelectedCategories;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function toggleCategory(category: string) {
    const next = new Set(activeSelectedCategories);

    if (next.has(category)) {
      next.delete(category);
    } else {
      next.add(category);
    }

    if (onSelectedCategoriesChange) {
      onSelectedCategoriesChange(next);
    } else {
      setInternalSelectedCategories(next);
    }
  }

  return (
    <div ref={dropdownRef} className="relative z-40">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 px-4 text-preset-5 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        {label}
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      {isOpen ? (
        <div
          aria-label={menuLabel}
          className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-md border border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900 shadow-[0_8px_18px_rgba(46,20,1,0.18)]"
          role="menu"
        >
          {categories.map((category) => {
            const inputId = `category-${category.label
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;
            const isSelected = activeSelectedCategories.has(category.label);

            return (
              <label
                key={category.label}
                htmlFor={inputId}
                className="flex min-h-[46px] cursor-pointer items-center gap-3 border-b border-brand-neutral-900 px-4 text-preset-5 last:border-b-0 hover:bg-brand-neutral-100"
                role="menuitemcheckbox"
                aria-checked={isSelected}
              >
                <input
                  id={inputId}
                  checked={isSelected}
                  className="peer sr-only"
                  type="checkbox"
                  onChange={() => toggleCategory(category.label)}
                />
                <span
                  aria-hidden="true"
                  className="flex size-5 shrink-0 items-center justify-center rounded-sm border border-brand-neutral-900 bg-brand-neutral-0 transition-[background-color,box-shadow] duration-150 ease-in-out peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-blue-600 peer-checked:bg-brand-yellow-500 peer-checked:bg-[url('/assets/check.svg')] peer-checked:bg-size-[12px_10px] peer-checked:bg-center peer-checked:bg-no-repeat"
                />
                <span className="flex min-w-0 items-baseline gap-1">
                  <span className="truncate">{category.label}</span>
                  <span className="text-brand-neutral-600">
                    ({category.count})
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
