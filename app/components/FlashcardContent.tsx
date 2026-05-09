"use client";

import {
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";

type FlashcardContentProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  answer?: ReactNode;
  progressValue?: number;
  progressMax?: number;
};

export function FlashcardContent({
  category = "Web Development",
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
  progressValue = 0,
  progressMax = 5,
  className = "",
  onClick,
  onKeyDown,
  ...props
}: FlashcardContentProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const safeProgressMax = progressMax > 0 ? progressMax : 5;
  const safeProgressValue = Math.min(Math.max(progressValue, 0), safeProgressMax);
  const isMastered = safeProgressValue >= safeProgressMax;

  function toggleCard() {
    setIsFlipped((current) => !current);
  }

  function handleClick(event: MouseEvent<HTMLElement>) {
    onClick?.(event);

    if (!event.defaultPrevented) {
      toggleCard();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  }

  const progressIndicator = (
    <div className="flex h-8 w-36 shrink-0 items-center justify-center">
      {isMastered ? (
        <div
          aria-label="Flashcard progress"
          aria-valuemax={safeProgressMax}
          aria-valuemin={0}
          aria-valuenow={safeProgressValue}
          className="inline-flex min-h-7 items-center justify-center gap-1.5 rounded-full border border-brand-neutral-900 bg-brand-teal-400 px-3 text-preset-6 leading-none text-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]"
          role="progressbar"
        >
          <Image
            src="/assets/check.svg"
            alt=""
            aria-hidden="true"
            width={14}
            height={14}
            className="size-3.5"
          />
          Mastered
          <span>
            {safeProgressValue}/{safeProgressMax}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <ProgressBar
            value={safeProgressValue}
            max={safeProgressMax}
            label="Flashcard progress"
          />
          <span className="text-preset-6">
            {safeProgressValue}/{safeProgressMax}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <article
      aria-label={isFlipped ? "Flashcard answer" : "Flashcard question"}
      aria-pressed={isFlipped}
      role="button"
      tabIndex={0}
      className={[
        "relative flex h-[360px] w-full max-w-[776px] cursor-pointer overflow-hidden rounded-2xl border border-brand-neutral-900 p-6 text-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)] transition-[background-color,box-shadow,transform] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-600",
        isFlipped ? "bg-brand-blue-400" : "bg-brand-pink-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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
        src={isFlipped ? "/assets/pink-star.svg" : "/assets/blue-star.svg"}
        alt=""
        aria-hidden="true"
        width={25}
        height={26}
        className={[
          "pointer-events-none absolute right-7 top-9 z-10 size-[25px] origin-center transition-transform duration-500",
          isFlipped ? "animate-star-sparkle" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <Image
        src="/assets/yellow-star.svg"
        alt=""
        aria-hidden="true"
        width={30}
        height={31}
        className={[
          "pointer-events-none absolute bottom-14 left-8 z-10 size-[30px] origin-center transition-transform duration-500",
          isFlipped ? "animate-star-sparkle-delayed" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <div
        className={[
          "relative z-20 h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          aria-hidden={isFlipped}
          className="absolute inset-0 flex flex-col items-center justify-between gap-4 [backface-visibility:hidden]"
        >
          <span className="inline-flex min-h-0 items-center justify-center rounded-full bg-brand-neutral-0 px-3 py-2 text-preset-6 leading-none text-brand-neutral-900 shadow-[inset_0_0_0_1px_var(--color-brand-neutral-900),2px_2px_0_0_var(--color-brand-neutral-900)]">
            {category}
          </span>

          <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-preset-1">{question}</h2>
            <p className="text-preset-4">Click to reveal answer</p>
          </div>

          {progressIndicator}
        </div>

        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 flex flex-col items-center justify-between gap-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <span className="inline-flex min-h-0 items-center justify-center rounded-full bg-brand-neutral-0 px-3 py-2 text-preset-6 leading-none text-brand-neutral-900 shadow-[inset_0_0_0_1px_var(--color-brand-neutral-900),2px_2px_0_0_var(--color-brand-neutral-900)]">
            {category}
          </span>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="text-preset-4">Answer:</p>
            <h2 className="text-preset-2">{answer}</h2>
          </div>

          {progressIndicator}
        </div>
      </div>
    </article>
  );
}
