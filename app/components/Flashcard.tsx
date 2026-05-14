"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import { DeleteCardDialog } from "./DeleteCardDialog";
import { EditCardDialog, type EditCardDialogValues } from "./EditCardDialog";

type FlashcardProps = HTMLAttributes<HTMLElement> & {
  category?: ReactNode;
  question?: ReactNode;
  answer?: ReactNode;
  progressValue?: number;
  progressMax?: number;
  mastered?: boolean;
  menuLabel?: string;
  onDelete?: () => void;
  onUpdate?: (values: EditCardDialogValues) => void;
};

type EditableCardContent = {
  answer: string;
  category: string;
  question: string;
};

function getEditableText(value: ReactNode, fallback: string) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function EditIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
      <path
        d="M9.8 2.8 13.2 6m-1.5-4.7 3 3-8 8.1-3.7.7.7-3.7 8-8.1Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
      <path
        d="M3 4.5h10M6.5 2.5h3l.5 2H6l.5-2Zm-2 2 .5 9h6l.5-9M6.8 7v4M9.2 7v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function Flashcard({
  category = "Web Development",
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
  progressValue = 0,
  progressMax = 5,
  mastered = false,
  menuLabel = "Flashcard options",
  onDelete,
  onUpdate,
  className = "",
  ...props
}: FlashcardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardContent, setCardContent] = useState<EditableCardContent>({
    answer: getEditableText(answer, "HyperText Markup Language"),
    category: getEditableText(category, "Web Development"),
    question: getEditableText(question, "What does HTML stand for?"),
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <article
      className={[
        "relative flex min-h-[232px] w-full flex-col overflow-hidden rounded-2xl border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]",
        "border-t border-r-[3px] border-b-[3px] border-l",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <header className="flex min-h-[49px] items-center border-b border-brand-neutral-900 px-3.5 py-3">
        <h2 className="text-preset-3">{cardContent.question}</h2>
      </header>

      <div className="flex min-h-[132px] flex-1 flex-col px-3.5 py-4">
        <p className="text-preset-5 text-brand-neutral-900/60">
          Answer:
        </p>
        <p className="mt-2 text-preset-5">{cardContent.answer}</p>
      </div>

      <footer className="grid min-h-[49px] grid-cols-[minmax(104px,auto)_1fr_42px] border-t border-brand-neutral-900">
        <div className="flex min-w-0 items-center px-3.5">
          <span className="inline-flex min-h-7 max-w-full items-center rounded-full border border-brand-neutral-900 px-3 text-[0.75rem] leading-none font-medium">
            {cardContent.category}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2 border-x border-brand-neutral-900 px-2">
          {mastered ? (
            <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-brand-neutral-900 bg-brand-teal-400 px-3 text-[0.75rem] leading-none font-semibold">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-full bg-brand-neutral-900"
              />
              Mastered
              <span>{progressValue}/{progressMax}</span>
            </span>
          ) : (
            <>
              <ProgressBar
                value={progressValue}
                max={progressMax}
                label="Flashcard progress"
                className="h-2 w-[54px]"
              />
              <span className="text-[0.75rem] leading-none font-medium">
                {progressValue}/{progressMax}
              </span>
            </>
          )}
        </div>

        <div ref={menuRef} className="relative z-30 flex items-center justify-center p-1">
          <button
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-label={menuLabel}
            className={[
              "flex size-8 cursor-pointer items-center justify-center rounded-md border bg-brand-neutral-0 text-brand-neutral-900 transition-[background-color,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600",
              isMenuOpen
                ? "border-brand-neutral-900 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]"
                : "border-transparent hover:border-brand-neutral-900 hover:shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]",
            ]
              .filter(Boolean)
              .join(" ")}
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <Image
              src="/assets/dots.svg"
              alt=""
              aria-hidden="true"
              width={4}
              height={15}
              className="h-[15px] w-1"
            />
          </button>

          {isMenuOpen ? (
            <div
              aria-label="Flashcard actions"
              className="absolute bottom-[calc(100%+6px)] right-2 z-40 w-40 overflow-hidden rounded-lg border border-brand-neutral-900 bg-brand-neutral-0 text-brand-neutral-900 shadow-[0_8px_14px_rgba(46,20,1,0.16)]"
              role="menu"
            >
              <button
                className="flex min-h-[39px] w-full cursor-pointer items-center gap-2.5 border-b border-brand-neutral-900 px-4 text-left text-preset-5 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-blue-600"
                role="menuitem"
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsEditDialogOpen(true);
                }}
              >
                <EditIcon />
                Edit
              </button>
              <button
                className="flex min-h-[39px] w-full cursor-pointer items-center gap-2.5 px-4 text-left text-preset-5 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-blue-600"
                role="menuitem"
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </footer>

      <EditCardDialog
        isOpen={isEditDialogOpen}
        values={cardContent}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(updatedContent) => {
          setCardContent(updatedContent);
          setIsEditDialogOpen(false);
          onUpdate?.(updatedContent);
        }}
      />

      <DeleteCardDialog
        cardQuestion={cardContent.question}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
          onDelete?.();
        }}
      />
    </article>
  );
}
