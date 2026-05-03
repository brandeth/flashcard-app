import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { FlashcardContent } from "./components/FlashcardContent";
import { Input } from "./components/Input";
import { ProgressBar } from "./components/ProgressBar";
import { Tabs } from "./components/Tabs";
import { TextArea } from "./components/TextArea";

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

        <div className="mt-8">
          <FlashcardContent />
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button iconLeft={<PlusIcon />}>Create Card</Button>

          <Button iconRight={<PlusIcon />}>Add Deck</Button>

          <Button iconLeft={<PlusIcon />} iconRight={<PlusIcon />}>
            New Set
          </Button>

          <Button disabled iconLeft={<PlusIcon />}>
            Disabled
          </Button>

          <Button variant="secondary" iconLeft={<PlusIcon />}>
            Import Cards
          </Button>

          <Button variant="outline" iconRight={<PlusIcon />}>
            Export Deck
          </Button>

          <Button variant="base-primary" iconLeft={<PlusIcon />}>
            Study Mode
          </Button>

          <Button variant="base-secondary" iconRight={<PlusIcon />}>
            All Cards
          </Button>
        </div>

        <div className="mt-8 max-w-[490px]">
          <Tabs
            tabs={[
              {
                value: "study",
                label: "Study Mode",
                panel: "Review your active deck one card at a time.",
              },
              {
                value: "all",
                label: "All Cards",
                panel: "Browse every card in the current deck.",
              },
            ]}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <Checkbox name="rememberDeck" label="Remember this deck" />

          <Checkbox name="shuffleCards" label="Shuffle cards" defaultChecked />

          <Checkbox
            name="checkboxOnly"
            aria-label="Checkbox without visible label"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Input
            label="Question"
            name="question"
            placeholder="e.g., What is the capital of France?"
          />

          <Input
            label="Question"
            name="questionWithError"
            placeholder="e.g., What is the capital of France?"
            validationMessage="Please enter a question."
          />

          <TextArea
            label="Answer"
            name="answer"
            placeholder="e.g., Paris is the capital of France."
          />

          <TextArea
            label="Answer"
            name="answerWithError"
            placeholder="e.g., Paris is the capital of France."
            validationMessage="Please enter an answer."
          />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {[0, 20, 40, 60, 80].map((value) => (
            <ProgressBar
              key={value}
              label={`Deck mastery ${value}%`}
              value={value}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
