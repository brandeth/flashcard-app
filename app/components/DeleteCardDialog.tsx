"use client";

import { useEffect, useRef } from "react";
import { Button } from "./Button";

type DeleteCardDialogProps = {
  cardQuestion: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteCardDialog({
  cardQuestion,
  isOpen,
  onClose,
  onConfirm,
}: DeleteCardDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    cancelButtonRef.current?.focus();

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
        aria-describedby="delete-card-dialog-description"
        aria-labelledby="delete-card-dialog-title"
        aria-modal="true"
        className={[
          "w-full max-w-[516px] overflow-hidden rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900",
          "border-t border-r-4 border-b-4 border-l",
        ].join(" ")}
        role="dialog"
      >
        <div className="px-5 py-5 sm:px-8 sm:py-5">
          <h2 id="delete-card-dialog-title" className="text-preset-2">
            Delete this card?
          </h2>
          <p
            id="delete-card-dialog-description"
            className="mt-1 text-preset-5-regular"
          >
            This action can&apos;t be undone.
          </p>
          <p className="sr-only">Card question: {cardQuestion}</p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-brand-neutral-900 px-5 py-3 sm:flex-row sm:justify-end sm:px-4">
          <Button
            ref={cancelButtonRef}
            variant="outline"
            className="min-h-10 px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="min-h-10 px-4 py-2" onClick={onConfirm}>
            Delete Card
          </Button>
        </div>
      </div>
    </div>
  );
}
