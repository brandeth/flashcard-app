import type { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { ProgressBar } from "./ProgressBar";

type FlashcardContentProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  progressValue?: number;
  progressMax?: number;
};

export function FlashcardContent({
  category = "Web Development",
  question = "What does HTML stand for?",
  progressValue = 0,
  progressMax = 5,
  className = "",
  ...props
}: FlashcardContentProps) {
  return (
    <article
      className={[
        "relative flex h-[360px] w-full max-w-[776px] overflow-hidden rounded-2xl border border-brand-neutral-900 bg-brand-pink-400 p-6 text-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Image
        src="/assets/flashcard-pattern.svg"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 776px) 776px, 100vw"
        className="pointer-events-none absolute inset-0 z-0 object-cover"
      />
      <Image
        src="/assets/blue-star.svg"
        alt=""
        aria-hidden="true"
        width={25}
        height={26}
        className="pointer-events-none absolute right-7 top-9 z-10 size-[25px]"
      />
      <Image
        src="/assets/yellow-star.svg"
        alt=""
        aria-hidden="true"
        width={30}
        height={31}
        className="pointer-events-none absolute bottom-14 left-8 z-10 size-[30px]"
      />

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-between gap-4">
        <Button
          variant="secondary"
          className="min-h-0 px-3 py-2 text-preset-6 leading-none"
        >
          {category}
        </Button>

        <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-preset-1">{question}</h2>
          <p className="text-preset-4">Click to reveal answer</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <ProgressBar
            value={progressValue}
            max={progressMax}
            label="Flashcard progress"
          />
          <span className="text-preset-6">
            {progressValue}/{progressMax}
          </span>
        </div>
      </div>
    </article>
  );
}
