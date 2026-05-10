"use client";

import { useMemo, useState } from "react";
import { flashcards, type FlashcardData } from "../data/flashcards";
import { FlashcardSection } from "./FlashcardSection";
import { StatCardList } from "./StatCardList";

function StackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path
        d="m14 4 11 5-11 5L3 9l11-5ZM25 14l-11 5-11-5M25 19l-11 5-11-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path
        d="M10.5 5.5a4 4 0 0 0-4 4v.2A4.8 4.8 0 0 0 4 14a4.8 4.8 0 0 0 2.5 4.3v.2a4 4 0 0 0 7 2.6V6.9a3.9 3.9 0 0 0-3-1.4ZM17.5 5.5a4 4 0 0 1 4 4v.2A4.8 4.8 0 0 1 24 14a4.8 4.8 0 0 1-2.5 4.3v.2a4 4 0 0 1-7 2.6V6.9a3.9 3.9 0 0 1 3-1.4ZM9 12v4M19 12v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path
        d="M5 6.5h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H5V6.5ZM23 6.5h-7a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h7V6.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function TrayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28">
      <path
        d="M7.5 10.5h13l2.5 4.2v6.8H5v-6.8l2.5-4.2ZM9.5 14.7l1.7 2.3h5.6l1.7-2.3M10.5 7.5h7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function getProgressMax(card: FlashcardData) {
  return card.progressMax && card.progressMax > 0 ? card.progressMax : 5;
}

function getInitialProgressValues(cards: FlashcardData[]) {
  return cards.map((card) => {
    const progressMax = getProgressMax(card);

    return card.mastered
      ? progressMax
      : Math.min(Math.max(card.progressValue, 0), progressMax);
  });
}

export function StudyDashboard() {
  const [cardProgressValues, setCardProgressValues] = useState(() =>
    getInitialProgressValues(flashcards),
  );

  const studyStats = useMemo(() => {
    const mastered = flashcards.filter(
      (card, index) => (cardProgressValues[index] ?? 0) >= getProgressMax(card),
    ).length;
    const inProgress = flashcards.filter((card, index) => {
      const progressValue = cardProgressValues[index] ?? 0;

      return progressValue > 0 && progressValue < getProgressMax(card);
    }).length;
    const notStarted = flashcards.length - mastered - inProgress;

    return [
      {
        label: "Total Cards",
        value: flashcards.length,
        icon: <StackIcon />,
        accentClassName: "bg-brand-blue-400",
      },
      {
        label: "Mastered",
        value: mastered,
        icon: <BrainIcon />,
        accentClassName: "bg-brand-teal-400",
      },
      {
        label: "In Progress",
        value: inProgress,
        icon: <BookIcon />,
        accentClassName: "bg-brand-pink-500",
      },
      {
        label: "Not Started",
        value: notStarted,
        icon: <TrayIcon />,
        accentClassName: "bg-brand-pink-400",
      },
    ];
  }, [cardProgressValues]);

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-between gap-6 xl:grid-cols-[minmax(0,860px)_392px]">
      <FlashcardSection
        cardProgressValues={cardProgressValues}
        flashcards={flashcards}
        onCardProgressValuesChange={setCardProgressValues}
      />
      <StatCardList title="Study Statistics" stats={studyStats} />
    </div>
  );
}
