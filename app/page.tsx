import { Button } from "./components/Button";

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 3v10M3 8h10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-neutral-900 p-8 text-white">
      <section className="rounded-lg bg-white p-6 text-brand-neutral-900">
        <h1 className="text-preset-1">Flashcards</h1>

        <p className="mt-3 text-preset-5-regular">
          Create, review, and master your study cards.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button iconLeft={<PlusIcon />}>Create Card</Button>

          <Button iconRight={<PlusIcon />}>Add Deck</Button>

          <Button iconLeft={<PlusIcon />} iconRight={<PlusIcon />}>
            New Set
          </Button>

          <Button disabled iconLeft={<PlusIcon />}>
            Disabled
          </Button>
        </div>
      </section>
    </main>
  );
}
