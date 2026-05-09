"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { CategoryDropdown } from "./CategoryDropdown";
import { Checkbox } from "./Checkbox";
import { FlashcardContent } from "./FlashcardContent";

type FlashcardSectionProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  answer?: ReactNode;
  progressValue?: number;
  progressMax?: number;
  currentCard?: number;
  totalCards?: number;
};

function IconImage({
  alt = "",
  src,
}: Readonly<{
  alt?: string;
  src: string;
}>) {
  return (
    <Image
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={16}
      height={16}
      className="size-4"
    />
  );
}

export function FlashcardSection({
  category = "Web Development",
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
  progressValue = 0,
  progressMax = 5,
  currentCard = 1,
  totalCards = 40,
  className = "",
  ...props
}: FlashcardSectionProps) {
  const safeProgressMax = progressMax > 0 ? progressMax : 5;
  const [currentProgress, setCurrentProgress] = useState(() =>
    Math.min(Math.max(progressValue, 0), safeProgressMax),
  );
  const isMastered = currentProgress >= safeProgressMax;

  function handleKnowThis() {
    setCurrentProgress((current) => Math.min(current + 1, safeProgressMax));
  }

  function handleResetProgress() {
    setCurrentProgress(0);
  }

  return (
    <section
      aria-label="Study flashcard"
      className={[
        "w-full overflow-hidden rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900",
        "border-t border-r-[3px] border-b-[3px] border-l",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-neutral-900 px-4 py-4 sm:px-5 md:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <CategoryDropdown />

          <Checkbox
            label="Hide Mastered"
            name="hide-mastered"
            className="[&>span:first-of-type]:size-4"
          />
        </div>

        <Button
          variant="outline"
          iconLeft={<IconImage src="/assets/shuffle.svg" />}
          className="min-h-10 px-4 py-2"
        >
          Shuffle
        </Button>
      </header>

      <div className="flex flex-col items-center gap-4 border-b border-brand-neutral-900 px-4 py-4 sm:px-5 md:px-6">
        <FlashcardContent
          answer={answer}
          category={category}
          progressMax={safeProgressMax}
          progressValue={currentProgress}
          question={question}
          className="h-[306px] max-w-none p-5"
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            disabled={isMastered}
            iconLeft={
              <IconImage
                src={isMastered ? "/assets/check-circle.svg" : "/assets/check.svg"}
              />
            }
            onClick={handleKnowThis}
            className="min-h-10 px-4 py-2"
          >
            {isMastered ? "Already Mastered" : "I Know This"}
          </Button>
          <Button
            variant="secondary"
            iconLeft={<IconImage src="/assets/undo-alt.svg" />}
            onClick={handleResetProgress}
            className="min-h-10 px-4 py-2"
          >
            Reset Progress
          </Button>
        </div>
      </div>

      <footer className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-5 md:px-6">
        <Button
          variant="outline"
          iconLeft={<IconImage src="/assets/angle-left.svg" />}
          className="min-h-10 px-4 py-2"
        >
          Previous
        </Button>

        <p className="text-center text-preset-5 text-brand-neutral-600">
          Card {currentCard} of {totalCards}
        </p>

        <Button
          variant="outline"
          iconRight={<IconImage src="/assets/angle-right.svg" />}
          className="min-h-10 px-4 py-2"
        >
          Next
        </Button>
      </footer>
    </section>
  );
}
