"use client";

import { useState } from "react";
import { flashcards as defaultFlashcards } from "../data/flashcards";
import { AllCardsList, type AllCardsListItem } from "./AllCardsList";
import {
  CreateCardForm,
  type CreateCardFormValues,
} from "./CreateCardForm";

function getInitialFlashcards() {
  return defaultFlashcards.map((flashcard, index) => ({
    ...flashcard,
    id: `${flashcard.question}-${index}`,
  }));
}

function createFlashcardId(question: string) {
  return `${question}-${Date.now()}-${crypto.randomUUID()}`;
}

export function AllCardsManager() {
  const [flashcards, setFlashcards] =
    useState<AllCardsListItem[]>(getInitialFlashcards);

  function handleCreateCard(values: CreateCardFormValues) {
    setFlashcards((currentFlashcards) => [
      {
        ...values,
        id: createFlashcardId(values.question),
        progressValue: 0,
      },
      ...currentFlashcards,
    ]);
  }

  function handleDeleteCard(id: string) {
    setFlashcards((currentFlashcards) =>
      currentFlashcards.filter((flashcard) => flashcard.id !== id),
    );
  }

  return (
    <>
      <CreateCardForm onCreateCard={handleCreateCard} />
      <AllCardsList flashcards={flashcards} onDeleteCard={handleDeleteCard} />
    </>
  );
}
