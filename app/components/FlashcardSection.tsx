"use client";

import {
  type Dispatch,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type SetStateAction,
} from "react";
import Image from "next/image";
import Link from "next/link";
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

type IndexedFlashcard = FlashcardSectionCard & {
  sourceIndex: number;
};

type FlashcardSectionProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  answer?: ReactNode;
  progressValue?: number;
  progressMax?: number;
  currentCard?: number;
  totalCards?: number;
  flashcards?: FlashcardSectionCard[];
  cardProgressValues?: number[];
  onCardProgressValuesChange?: Dispatch<SetStateAction<number[]>>;
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

function isInitiallyMastered(card: FlashcardSectionCard) {
  return "mastered" in card && card.mastered === true;
}

function getCategoryLabel(category: ReactNode) {
  if (typeof category === "string" || typeof category === "number") {
    return String(category);
  }

  return "Uncategorized";
}

function shuffleIndexes(indexes: number[]) {
  const shuffled = [...indexes];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function EmptyStudyState({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex w-full flex-1 items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex max-w-[42rem] flex-col items-center">{children}</div>
    </div>
  );
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
  cardProgressValues,
  onCardProgressValuesChange,
  className = "",
  ...props
}: FlashcardSectionProps) {
  const cards = useMemo<FlashcardSectionCard[]>(
    () =>
      flashcards !== undefined
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
          ],
    [answer, category, flashcards, progressMax, progressValue, question],
  );
  const initialCardIndex = Math.min(
    Math.max(currentCard - 1, 0),
    cards.length - 1,
  );
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(initialCardIndex);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const [hideMastered, setHideMastered] = useState(false);
  const [cardOrder, setCardOrder] = useState(() =>
    cards.map((_, index) => index),
  );
  const [internalCardProgressValues, setInternalCardProgressValues] = useState(() =>
    cards.map((card) => {
      const cardProgressMax = getProgressMax(card, progressMax);

      return isInitiallyMastered(card)
        ? cardProgressMax
        : Math.min(Math.max(card.progressValue ?? 0, 0), cardProgressMax);
    }),
  );
  const activeCardProgressValues = cardProgressValues ?? internalCardProgressValues;
  const setActiveCardProgressValues =
    onCardProgressValuesChange ?? setInternalCardProgressValues;

  const categories = useMemo(() => {
    const categoryCounts = new Map<string, number>();

    cards.forEach((card) => {
      const categoryLabel = getCategoryLabel(card.category);
      categoryCounts.set(categoryLabel, (categoryCounts.get(categoryLabel) ?? 0) + 1);
    });

    return Array.from(categoryCounts, ([label, count]) => ({
      label,
      count,
    })).sort((first, second) => first.label.localeCompare(second.label));
  }, [cards]);

  const visibleCards = useMemo<IndexedFlashcard[]>(
    () =>
      cardOrder
        .map((sourceIndex) => ({
          ...cards[sourceIndex],
          sourceIndex,
        }))
        .filter((card) => {
          const matchesCategory =
            selectedCategories.size === 0 ||
            selectedCategories.has(getCategoryLabel(card.category));

          if (!matchesCategory) {
            return false;
          }

          if (!hideMastered) {
            return true;
          }

          const progressMaxForCard = getProgressMax(card, progressMax);
          const progressValue = activeCardProgressValues[card.sourceIndex] ?? 0;

          return progressValue < progressMaxForCard;
        }),
    [
      activeCardProgressValues,
      cardOrder,
      cards,
      hideMastered,
      progressMax,
      selectedCategories,
    ],
  );

  const effectiveVisibleIndex = Math.min(
    Math.max(currentVisibleIndex, 0),
    Math.max(visibleCards.length - 1, 0),
  );
  const activeCard = visibleCards[effectiveVisibleIndex];
  const activeSourceIndex = activeCard?.sourceIndex ?? 0;
  const hasCards = cards.length > 0;
  const allCardsMastered =
    hasCards &&
    cards.every((card, index) => {
      const cardProgressMax = getProgressMax(card, progressMax);
      const cardProgressValue = activeCardProgressValues[index] ?? 0;

      return cardProgressValue >= cardProgressMax;
    });
  const activeProgressMax = activeCard
    ? getProgressMax(activeCard, progressMax)
    : progressMax;
  const currentProgress = activeCard
    ? activeCardProgressValues[activeSourceIndex] ?? 0
    : 0;
  const currentCardNumber = activeCard ? effectiveVisibleIndex + 1 : 0;
  const totalCardCount = totalCards ?? visibleCards.length;
  const hasPreviousCard = effectiveVisibleIndex > 0;
  const hasNextCard = effectiveVisibleIndex < visibleCards.length - 1;
  const isMastered = currentProgress >= activeProgressMax;
  const isCaughtUp = hideMastered && allCardsMastered;
  const categoryLabel =
    selectedCategories.size === 0
      ? "All Categories"
      : `${selectedCategories.size} Selected`;

  function handleKnowThis() {
    if (!activeCard) {
      return;
    }

    setActiveCardProgressValues((current) =>
      current.map((value, index) =>
        index === activeSourceIndex ? Math.min(value + 1, activeProgressMax) : value,
      ),
    );
  }

  function handleResetProgress() {
    if (!activeCard) {
      return;
    }

    setActiveCardProgressValues((current) =>
      current.map((value, index) => (index === activeSourceIndex ? 0 : value)),
    );
  }

  function handlePreviousCard() {
    setCurrentVisibleIndex(Math.max(effectiveVisibleIndex - 1, 0));
  }

  function handleNextCard() {
    setCurrentVisibleIndex(
      Math.min(effectiveVisibleIndex + 1, visibleCards.length - 1),
    );
  }

  function handleShuffle() {
    setCardOrder((current) => shuffleIndexes(current));
    setCurrentVisibleIndex(0);
  }

  return (
    <section
      aria-label="Study flashcard"
      className={[
        "flex h-full w-full flex-col overflow-hidden rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900",
        "border-t border-r-[3px] border-b-[3px] border-l",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-neutral-900 px-4 py-4 sm:px-5 md:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <CategoryDropdown
            categories={categories}
            label={categoryLabel}
            selectedCategories={selectedCategories}
            onSelectedCategoriesChange={setSelectedCategories}
          />

          <Checkbox
            checked={hideMastered}
            label="Hide Mastered"
            name="hide-mastered"
            onChange={(event) => setHideMastered(event.target.checked)}
            className="[&>span:first-of-type]:size-4"
          />
        </div>

        <Button
          variant="outline"
          iconLeft={<IconImage src="/assets/shuffle.svg" />}
          onClick={handleShuffle}
          disabled={visibleCards.length <= 1}
          className="min-h-10 px-4 py-2"
        >
          Shuffle
        </Button>
      </header>

      <div
        className={[
          "flex flex-1 flex-col items-center gap-4 px-4 py-4 sm:px-5 md:px-6",
          activeCard ? "border-b border-brand-neutral-900" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {activeCard ? (
          <>
            <FlashcardContent
              key={activeSourceIndex}
              answer={activeCard.answer}
              category={activeCard.category}
              progressMax={activeProgressMax}
              progressValue={currentProgress}
              question={activeCard.question}
              className="min-h-[306px] flex-1 max-w-none p-5"
            />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                disabled={isMastered}
                iconLeft={
                  <IconImage
                    src={
                      isMastered
                        ? "/assets/check-circle.svg"
                        : "/assets/check.svg"
                    }
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
          </>
        ) : isCaughtUp ? (
          <EmptyStudyState>
            <h2 className="text-preset-2 text-brand-neutral-900">
              You&apos;re all caught up!
            </h2>
            <p className="mt-3 max-w-[38rem] text-preset-4-regular text-brand-neutral-600">
              All your cards are mastered. Turn off &ldquo;Hide Mastered&rdquo;
              <br />
              see them again.
            </p>
          </EmptyStudyState>
        ) : hasCards ? (
          <EmptyStudyState>
            <p className="text-preset-4 text-brand-neutral-600">
              No cards match the current filters.
            </p>
          </EmptyStudyState>
        ) : (
          <EmptyStudyState>
            <h2 className="text-preset-2 text-brand-neutral-900">
              No cards to study
            </h2>
            <p className="mt-3 max-w-[420px] text-preset-4 text-brand-neutral-600">
              You don&apos;t have any cards yet. Add your first card in the All
              Cards tab.
            </p>
            <Link
              href="/all-cards"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-neutral-900 bg-brand-neutral-0 px-5 py-3 text-preset-4 leading-none text-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)] transition-[background-color,box-shadow,outline-color] duration-150 ease-in-out hover:bg-brand-neutral-100 hover:shadow-[3px_3px_0_0_var(--color-brand-neutral-900)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
            >
              Go to All Cards
            </Link>
          </EmptyStudyState>
        )}
      </div>

      {activeCard ? (
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
      ) : null}
    </section>
  );
}
