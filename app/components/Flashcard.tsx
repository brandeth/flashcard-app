import type { HTMLAttributes, ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

type FlashcardProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  answer?: ReactNode;
  progressValue?: number;
  progressMax?: number;
  mastered?: boolean;
  menuLabel?: string;
};

export function Flashcard({
  category = "Web Development",
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
  progressValue = 0,
  progressMax = 5,
  mastered = false,
  menuLabel = "Flashcard options",
  className = "",
  ...props
}: FlashcardProps) {
  return (
    <article
      className={[
        "flex min-h-[232px] w-full flex-col overflow-hidden rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]",
        "border-t border-r-[3px] border-b-[3px] border-l",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <header className="flex min-h-[49px] items-center border-b border-brand-neutral-900 px-3.5 py-3">
        <h2 className="text-preset-3">{question}</h2>
      </header>

      <div className="flex min-h-[132px] flex-1 flex-col px-3.5 py-4">
        <p className="text-preset-5 text-brand-neutral-900/60">
          Answer:
        </p>
        <p className="mt-2 text-preset-5">{answer}</p>
      </div>

      <footer className="grid min-h-[49px] grid-cols-[minmax(104px,auto)_1fr_42px] border-t border-brand-neutral-900">
        <div className="flex min-w-0 items-center px-3.5">
          <span className="inline-flex min-h-7 max-w-full items-center rounded-full border border-brand-neutral-900 px-3 text-[0.75rem] leading-none font-medium">
            {category}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2 border-x border-brand-neutral-900 px-2">
          {mastered ? (
            <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-brand-neutral-900 bg-brand-teal-400 px-3 text-[0.75rem] leading-none font-semibold">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-full bg-brand-neutral-900"
              />
              Mastered
              <span>{progressValue}/{progressMax}</span>
            </span>
          ) : (
            <>
              <ProgressBar
                value={progressValue}
                max={progressMax}
                label="Flashcard progress"
                className="h-2 w-[54px]"
              />
              <span className="text-[0.75rem] leading-none font-medium">
                {progressValue}/{progressMax}
              </span>
            </>
          )}
        </div>

        <button
          aria-label={menuLabel}
          className="flex cursor-pointer items-center justify-center text-brand-neutral-900 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-brand-blue-600"
          type="button"
        >
          <span aria-hidden="true" className="flex flex-col gap-1">
            <span className="size-1 rounded-full bg-current" />
            <span className="size-1 rounded-full bg-current" />
            <span className="size-1 rounded-full bg-current" />
          </span>
        </button>
      </footer>
    </article>
  );
}
