"use client";

import { useEffect, useState } from "react";
import { flashcards as defaultFlashcards } from "../data/flashcards";
import { AllCardsList, type AllCardsListItem } from "./AllCardsList";
import {
  CreateCardForm,
  type CreateCardFormValues,
} from "./CreateCardForm";
import { Toast } from "./Toast";

const TOAST_VISIBLE_DURATION = 4000;
const TOAST_FADE_DURATION = 400;

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
  const [toastMessage, setToastMessage] = useState("");
  const [isToastLeaving, setIsToastLeaving] = useState(false);
  const [toastVersion, setToastVersion] = useState(0);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsToastLeaving(true);
    }, TOAST_VISIBLE_DURATION);
    const dismissTimer = window.setTimeout(() => {
      setToastMessage("");
      setIsToastLeaving(false);
    }, TOAST_VISIBLE_DURATION + TOAST_FADE_DURATION);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [toastMessage, toastVersion]);

  function showToast(message: string) {
    setIsToastLeaving(false);
    setToastMessage(message);
    setToastVersion((currentVersion) => currentVersion + 1);
  }

  function closeToast() {
    setToastMessage("");
    setIsToastLeaving(false);
  }

  function handleCreateCard(values: CreateCardFormValues) {
    setFlashcards((currentFlashcards) => [
      {
        ...values,
        id: createFlashcardId(values.question),
        progressValue: 0,
      },
      ...currentFlashcards,
    ]);
    showToast("Card created successfully.");
  }

  function handleDeleteCard(id: string) {
    setFlashcards((currentFlashcards) =>
      currentFlashcards.filter((flashcard) => flashcard.id !== id),
    );
    showToast("Card deleted.");
  }

  function handleUpdateCard(id: string, values: CreateCardFormValues) {
    setFlashcards((currentFlashcards) =>
      currentFlashcards.map((flashcard) =>
        flashcard.id === id ? { ...flashcard, ...values } : flashcard,
      ),
    );
    showToast("Card updated successfully.");
  }

  return (
    <>
      {toastMessage ? (
        <div className="fixed right-3 top-3 z-[60] sm:right-8 sm:top-6">
          <Toast
            className={isToastLeaving ? "animate-toast-fade-out" : ""}
            onClose={closeToast}
          >
            {toastMessage}
          </Toast>
        </div>
      ) : null}

      <CreateCardForm onCreateCard={handleCreateCard} />
      <AllCardsList
        flashcards={flashcards}
        onDeleteCard={handleDeleteCard}
        onUpdateCard={handleUpdateCard}
      />
    </>
  );
}
