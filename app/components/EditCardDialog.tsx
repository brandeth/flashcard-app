"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

type EditCardDialogValues = {
  answer: string;
  category: string;
  question: string;
};

type EditCardDialogProps = {
  isOpen: boolean;
  values: EditCardDialogValues;
  onClose: () => void;
  onSubmit: (values: EditCardDialogValues) => void;
};

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
      <path
        d="m6 6 12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export function EditCardDialog({
  isOpen,
  values,
  onClose,
  onSubmit,
}: EditCardDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    questionRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit({
      answer: String(formData.get("answer") ?? ""),
      category: String(formData.get("category") ?? ""),
      question: String(formData.get("question") ?? ""),
    });
  }

  return (
    <div
      data-modal-overlay
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-neutral-900/50 px-5 py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        aria-labelledby="edit-card-dialog-title"
        aria-modal="true"
        className={[
          "relative max-h-full w-full overflow-y-auto rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 p-8 text-brand-neutral-900 md:overflow-visible",
          "md:h-[505px] md:w-[600px]",
          "border-t border-r-4 border-b-4 border-l",
        ].join(" ")}
        role="dialog"
      >
        <button
          aria-label="Close edit card dialog"
          className="absolute right-6 top-6 flex size-10 cursor-pointer items-center justify-center rounded-md text-brand-neutral-900 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
          type="button"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <h2 id="edit-card-dialog-title" className="pr-12 text-preset-2">
            Edit your card
          </h2>

          <div className="mt-5 flex flex-col gap-4">
            <Input
              ref={questionRef}
              defaultValue={values.question}
              label="Question"
              name="question"
              required
            />
            <TextArea
              defaultValue={values.answer}
              label="Answer"
              name="answer"
              required
              resize="none"
            />
            <Input
              defaultValue={values.category}
              label="Category"
              name="category"
              required
            />
          </div>

          <Button className="mt-auto self-end" type="submit">
            Update Card
          </Button>
        </form>
      </div>
    </div>
  );
}
