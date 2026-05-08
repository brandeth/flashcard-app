import { FlashcardSection } from "./components/FlashcardSection";
import { StatCardList } from "./components/StatCardList";

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

const studyStats = [
  {
    label: "Total Cards",
    value: "40",
    icon: <StackIcon />,
    accentClassName: "bg-brand-blue-400",
  },
  {
    label: "Mastered",
    value: "11",
    icon: <BrainIcon />,
    accentClassName: "bg-brand-teal-400",
  },
  {
    label: "In Progress",
    value: "21",
    icon: <BookIcon />,
    accentClassName: "bg-brand-pink-500",
  },
  {
    label: "Not Started",
    value: "8",
    icon: <TrayIcon />,
    accentClassName: "bg-brand-pink-400",
  },
];

export default function Home() {
  return (
    <main className="flex-1 bg-brand-neutral-100 px-5 pb-10 pt-4 text-brand-neutral-900 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 xl:grid-cols-[minmax(0,860px)_392px] justify-between">
        <FlashcardSection />
        <StatCardList title="Study Statistics" stats={studyStats} />
      </div>
    </main>
  );
}
