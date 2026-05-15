"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { CategoryDropdown } from "./CategoryDropdown";
import { Checkbox } from "./Checkbox";
import { Flashcard } from "./Flashcard";
import type { CreateCardFormValues } from "./CreateCardForm";
import type { FlashcardData } from "../data/flashcards";

export type AllCardsListItem = FlashcardData & {
  id: string;
};

type AllCardsListProps = {
  flashcards: AllCardsListItem[];
  onDeleteCard: (id: string) => void;
  onUpdateCard: (id: string, values: CreateCardFormValues) => void;
};

function IconImage({ src }: Readonly<{ src: string }>) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      className="size-4"
    />
  );
}

function getProgressMax(flashcard: AllCardsListItem) {
  return flashcard.progressMax && flashcard.progressMax > 0
    ? flashcard.progressMax
    : 5;
}

function isMastered(flashcard: AllCardsListItem) {
  return (
    flashcard.mastered === true ||
    flashcard.progressValue >= getProgressMax(flashcard)
  );
}

function shuffleItems<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function AllCardsList({
  flashcards,
  onDeleteCard,
  onUpdateCard,
}: AllCardsListProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const [hideMastered, setHideMastered] = useState(false);
  const [cardOrder, setCardOrder] = useState<string[]>(() =>
    flashcards.map((flashcard) => flashcard.id),
  );

  const categories = useMemo(() => {
    const categoryCounts = new Map<string, number>();

    flashcards.forEach((flashcard) => {
      categoryCounts.set(
        flashcard.category,
        (categoryCounts.get(flashcard.category) ?? 0) + 1,
      );
    });

    return Array.from(categoryCounts, ([label, count]) => ({
      label,
      count,
    })).sort((first, second) => first.label.localeCompare(second.label));
  }, [flashcards]);

  const orderedFlashcards = useMemo(() => {
    const cardsById = new Map(
      flashcards.map((flashcard) => [flashcard.id, flashcard]),
    );
    const orderedCards = cardOrder
      .map((id) => cardsById.get(id))
      .filter((flashcard): flashcard is AllCardsListItem => Boolean(flashcard));
    const orderedIds = new Set(orderedCards.map((flashcard) => flashcard.id));
    const newCards = flashcards.filter((flashcard) => !orderedIds.has(flashcard.id));

    return [...newCards, ...orderedCards];
  }, [cardOrder, flashcards]);

  const visibleFlashcards = useMemo(
    () =>
      orderedFlashcards.filter((flashcard) => {
        const matchesCategory =
          selectedCategories.size === 0 ||
          selectedCategories.has(flashcard.category);

        if (!matchesCategory) {
          return false;
        }

        return !hideMastered || !isMastered(flashcard);
      }),
    [hideMastered, orderedFlashcards, selectedCategories],
  );
  const categoryLabel =
    selectedCategories.size === 0
      ? "All Categories"
      : `${selectedCategories.size} Selected`;

  function handleShuffle() {
    const visibleCardIds = visibleFlashcards.map((flashcard) => flashcard.id);
    const shuffledVisibleCardIds = shuffleItems(visibleCardIds);
    const visibleCardIdSet = new Set(visibleCardIds);
    let shuffledIndex = 0;

    setCardOrder(
      orderedFlashcards.map((flashcard) =>
        visibleCardIdSet.has(flashcard.id)
          ? shuffledVisibleCardIds[shuffledIndex++]
          : flashcard.id,
      ),
    );
  }

  return (
    <section aria-label="All flashcards" className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <CategoryDropdown
            categories={categories}
            label={categoryLabel}
            menuLabel="Filter all flashcards by category"
            selectedCategories={selectedCategories}
            onSelectedCategoriesChange={setSelectedCategories}
          />

          <Checkbox
            checked={hideMastered}
            label="Hide Mastered"
            name="all-cards-hide-mastered"
            onChange={(event) => setHideMastered(event.target.checked)}
            className="[&>span:first-of-type]:size-4"
          />
        </div>

        <Button
          variant="outline"
          iconLeft={<IconImage src="/assets/shuffle.svg" />}
          onClick={handleShuffle}
          disabled={visibleFlashcards.length <= 1}
          className="min-h-10 px-4 py-2"
        >
          Shuffle
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleFlashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            answer={flashcard.answer}
            category={flashcard.category}
            mastered={flashcard.mastered}
            menuLabel={`Options for ${flashcard.question}`}
            onDelete={() => {
              onDeleteCard(flashcard.id);
            }}
            onUpdate={(values) => {
              onUpdateCard(flashcard.id, values);
            }}
            progressMax={5}
            progressValue={flashcard.progressValue}
            question={flashcard.question}
          />
        ))}
      </div>

      {visibleFlashcards.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-brand-neutral-900 bg-brand-neutral-0 px-5 py-8 text-center shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]">
          <p className="text-preset-4 text-brand-neutral-600">
            No cards match the current filters.
          </p>
        </div>
      ) : null}

      <div className="mt-10 flex justify-center">
        <Button variant="outline" className="min-h-10 px-5 py-2">
          Load More
        </Button>
      </div>
    </section>
  );
}
