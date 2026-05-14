"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { Toast } from "./Toast";

export type CreateCardFormValues = {
  answer: string;
  category: string;
  question: string;
};

type CreateCardFormProps = {
  onCreateCard: (values: CreateCardFormValues) => void;
};

const TOAST_VISIBLE_DURATION = 4000;
const TOAST_FADE_DURATION = 400;

export function CreateCardForm({ onCreateCard }: CreateCardFormProps) {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isToastLeaving, setIsToastLeaving] = useState(false);
  const [toastVersion, setToastVersion] = useState(0);

  useEffect(() => {
    if (!isToastVisible) {
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsToastLeaving(true);
    }, TOAST_VISIBLE_DURATION);
    const dismissTimer = window.setTimeout(() => {
      setIsToastVisible(false);
      setIsToastLeaving(false);
    }, TOAST_VISIBLE_DURATION + TOAST_FADE_DURATION);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [isToastVisible, toastVersion]);

  function closeToast() {
    setIsToastVisible(false);
    setIsToastLeaving(false);
  }

  function handleCreateCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    onCreateCard({
      answer: String(formData.get("answer") ?? "").trim(),
      category: String(formData.get("category") ?? "").trim(),
      question: String(formData.get("question") ?? "").trim(),
    });

    form.reset();
    setIsToastLeaving(false);
    setIsToastVisible(true);
    setToastVersion((currentVersion) => currentVersion + 1);
  }

  return (
    <div className="relative">
      {isToastVisible ? (
        <div className="absolute right-3 top-3 z-10 sm:right-[-36px]">
          <Toast
            className={isToastLeaving ? "animate-toast-fade-out" : ""}
            onClose={closeToast}
          >
            Card created successfully.
          </Toast>
        </div>
      ) : null}

      <form
        className="flex min-h-[452px] w-full flex-col rounded-[32px] border-brand-neutral-900 border-t border-r-4 border-b-4 border-l bg-brand-neutral-0 p-8 text-brand-neutral-900"
        onSubmit={handleCreateCard}
      >
        <div className="flex flex-1 flex-col gap-4">
          <Input
            label="Question"
            name="question"
            placeholder="e.g., What is the capital of France?"
            required
          />
          <TextArea
            label="Answer"
            name="answer"
            placeholder="e.g., Paris"
            required
          />
          <Input
            label="Category"
            name="category"
            placeholder="e.g., Geography"
            required
          />
        </div>

        <Button
          className="mt-5 min-h-10 self-start px-4 py-2"
          iconLeft={
            <Image
              src="/assets/plus.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="size-4"
            />
          }
          type="submit"
        >
          Create Card
        </Button>
      </form>
    </div>
  );
}
