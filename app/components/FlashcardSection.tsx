"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { CategoryDropdown } from "./CategoryDropdown";
import { Checkbox } from "./Checkbox";
import { FlashcardContent } from "./FlashcardContent";
import {
  flashcards as defaultFlashcards,
  type FlashcardData,
} from "../data/flashcards";

type StudyFlashcard = {
  category: ReactNode;
  question: ReactNode;
  answer: ReactNode;
  progressValue?: number;
  progressMax?: number;
};

type FlashcardSectionCard = StudyFlashcard | FlashcardData;

type FlashcardSectionProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  answer?: ReactNode;
  progressValue?: number;
  progressMax?: number;
  currentCard?: number;
  totalCards?: number;
  flashcards?: FlashcardSectionCard[];
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

function getProgressMax(card: FlashcardSectionCard, fallbackProgressMax: number) {
  if (card.progressMax && card.progressMax > 0) {
    return card.progressMax;
  }

  return fallbackProgressMax > 0 ? fallbackProgressMax : 5;
}

export function FlashcardSection({
  category = "Web Development",
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
  progressValue = 0,
  progressMax = 5,
  currentCard = 1,
  totalCards,
  flashcards,
  className = "",
  ...props
}: FlashcardSectionProps) {
  const cards =
    flashcards && flashcards.length > 0
      ? flashcards
      : [
          {
            category,
            question,
            answer,
            progressValue,
            progressMax,
          },
          ...defaultFlashcards.slice(1),
        ];
  const initialCardIndex = Math.min(
    Math.max(currentCard - 1, 0),
    cards.length - 1,
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(initialCardIndex);
  const activeCard = cards[currentCardIndex];
  const activeProgressMax = getProgressMax(activeCard, progressMax);
  const [cardProgressValues, setCardProgressValues] = useState(() =>
    cards.map((card) => {
      const cardProgressMax = getProgressMax(card, progressMax);

      return Math.min(Math.max(card.progressValue ?? 0, 0), cardProgressMax);
    }),
  );
  const currentProgress = cardProgressValues[currentCardIndex] ?? 0;
  const currentCardNumber = currentCardIndex + 1;
  const totalCardCount = totalCards ?? cards.length;
  const hasPreviousCard = currentCardIndex > 0;
  const hasNextCard = currentCardIndex < cards.length - 1;
  const isMastered = currentProgress >= activeProgressMax;

  function handleKnowThis() {
    setCardProgressValues((current) =>
      current.map((value, index) =>
        index === currentCardIndex ? Math.min(value + 1, activeProgressMax) : value,
      ),
    );
  }

  function handleResetProgress() {
    setCardProgressValues((current) =>
      current.map((value, index) => (index === currentCardIndex ? 0 : value)),
    );
  }

  function handlePreviousCard() {
    setCurrentCardIndex((current) => Math.max(current - 1, 0));
  }

  function handleNextCard() {
    setCurrentCardIndex((current) => Math.min(current + 1, cards.length - 1));
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
          key={currentCardIndex}
          answer={activeCard.answer}
          category={activeCard.category}
          progressMax={activeProgressMax}
          progressValue={currentProgress}
          question={activeCard.question}
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
          disabled={!hasPreviousCard}
          iconLeft={<IconImage src="/assets/angle-left.svg" />}
          onClick={handlePreviousCard}
          className="min-h-10 px-4 py-2"
        >
          Previous
        </Button>

        <p className="text-center text-preset-5 text-brand-neutral-600">
          Card {currentCardNumber} of {totalCardCount}
        </p>

        <Button
          variant="outline"
          disabled={!hasNextCard}
          iconRight={<IconImage src="/assets/angle-right.svg" />}
          onClick={handleNextCard}
          className="min-h-10 px-4 py-2"
        >
          Next
        </Button>
      </footer>
    </section>
  );
}
