import { Flashcard } from "./components/Flashcard";

const flashcards = [
  {
    category: "Web Development",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    progressValue: 0,
  },
  {
    category: "JavaScript",
    question: "What is the difference between 'let' and 'const' in JavaScript?",
    answer:
      "'let' allows you to reassign the variable, while 'const' creates a constant reference that cannot be reassigned. Both are block-scoped.",
    progressValue: 2,
  },
  {
    category: "Web Development",
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    progressValue: 0,
  },
  {
    category: "Geography",
    question: "What is the capital of France?",
    answer: "Paris",
    progressValue: 5,
    mastered: true,
  },
  {
    category: "JavaScript",
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that has access to variables in its outer lexical scope, even after the outer function has returned.",
    progressValue: 1,
  },
  {
    category: "Web Development",
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    progressValue: 3,
  },
];

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
      <path
        d="M2.5 4.5h1.2c1.4 0 2.1 1.1 2.8 2.4l.9 1.7c.7 1.3 1.4 2.4 2.8 2.4h3.3M11 8.5l2.5 2.5L11 13.5M2.5 11h1.2c1 0 1.6-.6 2.1-1.4M9.7 4.5h3.8M11 2l2.5 2.5L11 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-neutral-100 px-6 py-4 text-brand-neutral-900">
      <div className="mx-auto flex max-w-[1124px] flex-col gap-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 px-4 text-preset-5 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
              type="button"
            >
              All Categories
              <ChevronDownIcon />
            </button>

            <label className="inline-flex cursor-pointer items-center gap-2 text-preset-5">
              <input
                className="size-4 appearance-none rounded-[3px] border border-brand-neutral-900 bg-brand-neutral-0 checked:bg-brand-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
                type="checkbox"
              />
              Hide Mastered
            </label>
          </div>

          <button
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 px-4 text-preset-5 transition-colors hover:bg-brand-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-600"
            type="button"
          >
            <ShuffleIcon />
            Shuffle
          </button>
        </div>

        <section
          aria-label="Flashcards"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {flashcards.map((flashcard) => (
            <Flashcard
              key={flashcard.question}
              answer={flashcard.answer}
              category={flashcard.category}
              mastered={flashcard.mastered}
              progressMax={5}
              progressValue={flashcard.progressValue}
              question={flashcard.question}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
