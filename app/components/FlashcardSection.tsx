import type { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { Button } from "./Button";
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

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
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
          <button
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 px-4 text-preset-5 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
            type="button"
          >
            All Categories
            <ChevronDownIcon />
          </button>

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
          progressMax={progressMax}
          progressValue={progressValue}
          question={question}
          className="h-[306px] max-w-none p-5"
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            iconLeft={<IconImage src="/assets/check.svg" />}
            className="min-h-10 px-4 py-2"
          >
            I Know This
          </Button>
          <Button
            variant="secondary"
            iconLeft={<IconImage src="/assets/undo-alt.svg" />}
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
