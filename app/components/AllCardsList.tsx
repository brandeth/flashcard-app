"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { CategoryDropdown } from "./CategoryDropdown";
import { Checkbox } from "./Checkbox";
import { Flashcard } from "./Flashcard";
import { flashcards } from "../data/flashcards";

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

export function AllCardsList() {
  const [visibleFlashcards, setVisibleFlashcards] = useState(() =>
    flashcards.map((flashcard, index) => ({
      ...flashcard,
      id: `${flashcard.question}-${index}`,
    })),
  );

  return (
    <section aria-label="All flashcards" className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <CategoryDropdown menuLabel="Filter all flashcards by category" />

          <Checkbox
            label="Hide Mastered"
            name="all-cards-hide-mastered"
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
              setVisibleFlashcards((currentFlashcards) =>
                currentFlashcards.filter(
                  (currentFlashcard) => currentFlashcard.id !== flashcard.id,
                ),
              );
            }}
            progressMax={5}
            progressValue={flashcard.progressValue}
            question={flashcard.question}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="outline" className="min-h-10 px-5 py-2">
          Load More
        </Button>
      </div>
    </section>
  );
}
