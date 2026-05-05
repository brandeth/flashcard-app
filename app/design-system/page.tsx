import type { Metadata } from "next";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Flashcard } from "../components/Flashcard";
import { FlashcardContent } from "../components/FlashcardContent";
import { Input } from "../components/Input";
import { ProgressBar } from "../components/ProgressBar";
import { Tabs } from "../components/Tabs";
import { TextArea } from "../components/TextArea";

export const metadata: Metadata = {
  title: "Design System | Flashcard App",
  description: "Component and typography presets for the Flashcard app.",
};

const textPresets = [
  {
    name: "Text Preset 1",
    className: "text-preset-1",
    sample: "Main study prompt",
    details: "Poppins Bold, 24px mobile, 32px tablet, 40px desktop",
  },
  {
    name: "Text Preset 2",
    className: "text-preset-2",
    sample: "Section heading",
    details: "Poppins SemiBold, 24px",
  },
  {
    name: "Text Preset 3",
    className: "text-preset-3",
    sample: "Card question title",
    details: "Poppins SemiBold, 20px",
  },
  {
    name: "Text Preset 4",
    className: "text-preset-4",
    sample: "Button and field labels",
    details: "Poppins SemiBold, 16px",
  },
  {
    name: "Text Preset 5",
    className: "text-preset-5",
    sample: "Supporting interface copy",
    details: "Poppins Medium, 14px",
  },
  {
    name: "Text Preset 5 Regular",
    className: "text-preset-5-regular",
    sample: "Helper text and body copy",
    details: "Poppins Regular, 14px",
  },
  {
    name: "Text Preset 6",
    className: "text-preset-6",
    sample: "Compact labels",
    details: "Poppins Medium, 12px",
  },
];

const accentColors = [
  ["Yellow 500", "bg-brand-yellow-500", "#F8CB46"],
  ["Blue 400", "bg-brand-blue-400", "#92ADEB"],
  ["Blue 600", "bg-brand-blue-600", "#5072C7"],
  ["Teal 400", "bg-brand-teal-400", "#47D9C9"],
  ["Pink 400", "bg-brand-pink-400", "#FC8AE5"],
  ["Pink 500", "bg-brand-pink-500", "#F073A3"],
  ["Pink 700", "bg-brand-pink-700", "#E11966"],
];

const neutralColors = [
  ["Neutral 0", "bg-brand-neutral-0", "#FFFFFF"],
  ["Neutral 100", "bg-brand-neutral-100", "#F7F3F0"],
  ["Neutral 600", "bg-brand-neutral-600", "#6D5B4D"],
  ["Neutral 900", "bg-brand-neutral-900", "#2E1401"],
];

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
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

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Section({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <section className="border-t border-brand-neutral-900/20 py-12">
      <div className="mb-7 flex flex-col gap-2">
        <h2 className="text-preset-2 text-brand-neutral-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ExamplePanel({
  children,
  label,
}: Readonly<{
  children: React.ReactNode;
  label: string;
}>) {
  return (
    <div className="flex min-h-[176px] flex-col gap-5 rounded-lg border border-brand-neutral-900 bg-brand-neutral-0 p-6 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]">
      <h3 className="text-preset-4 text-brand-neutral-900">{label}</h3>
      <div className="flex flex-1 flex-col justify-center gap-4">{children}</div>
    </div>
  );
}

function ColorGroup({
  colors,
  title,
}: Readonly<{
  colors: string[][];
  title: string;
}>) {
  return (
    <div>
      <h3 className="text-preset-3 text-brand-neutral-900">{title}</h3>
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 lg:grid-cols-5">
        {colors.map(([name, className, hex]) => (
          <div key={name} className="min-w-0">
            <div
              className={`h-[70px] rounded-md border border-brand-neutral-900/10 shadow-[inset_0_0_0_1px_rgb(46_20_1_/_0.04)] ${className}`}
            />
            <p className="mt-3 text-preset-5 text-brand-neutral-900">{name}</p>
            <div className="mt-3 grid grid-cols-[44px_1fr] gap-3 text-preset-6">
              <span className="text-brand-neutral-600/55">HEX</span>
              <span className="text-brand-neutral-900">{hex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-brand-neutral-100 px-5 py-8 text-brand-neutral-900 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col">
        <header className="pb-12">
          <p className="mb-3 text-preset-5 text-brand-neutral-600">
            Flashcard App
          </p>
          <h1 className="max-w-[760px] text-preset-1">
            Design system components and text presets
          </h1>
        </header>

        <Section title="Text Presets">
          <div className="overflow-hidden rounded-lg border border-brand-neutral-900 bg-brand-neutral-0 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]">
            {textPresets.map((preset) => (
              <div
                key={preset.name}
                className="grid grid-cols-1 gap-4 border-b border-brand-neutral-900/15 p-5 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)_220px] md:items-center md:p-6"
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="text-preset-4">{preset.name}</h3>
                  <code className="w-fit rounded-full border border-brand-neutral-900 px-3 py-1 text-preset-6">
                    .{preset.className}
                  </code>
                </div>
                <p className={preset.className}>{preset.sample}</p>
                <p className="text-preset-5-regular text-brand-neutral-600 md:text-right">
                  {preset.details}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Color Tokens">
          <div className="flex flex-col gap-12 rounded-lg border border-brand-neutral-900 bg-brand-neutral-0 p-6 shadow-[2px_2px_0_0_var(--color-brand-neutral-900)] sm:p-8">
            <ColorGroup title="Accent Colors" colors={accentColors} />
            <ColorGroup title="Neutral Colors" colors={neutralColors} />
          </div>
        </Section>

        <Section title="Buttons">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ExamplePanel label="Primary">
              <Button className="self-start" iconLeft={<PlusIcon />}>
                Add Card
              </Button>
            </ExamplePanel>
            <ExamplePanel label="Secondary">
              <Button
                className="self-start"
                variant="secondary"
                iconRight={<ArrowRightIcon />}
              >
                Review Deck
              </Button>
            </ExamplePanel>
            <ExamplePanel label="Outline">
              <Button className="self-start" variant="outline">
                Cancel
              </Button>
            </ExamplePanel>
            <ExamplePanel label="Base Primary">
              <Button className="self-start" variant="base-primary">
                Selected
              </Button>
            </ExamplePanel>
            <ExamplePanel label="Base Secondary">
              <Button className="self-start" variant="base-secondary">
                Unselected
              </Button>
            </ExamplePanel>
            <ExamplePanel label="Disabled">
              <Button disabled className="self-start" iconLeft={<PlusIcon />}>
                Add Card
              </Button>
            </ExamplePanel>
          </div>
        </Section>

        <Section title="Fields">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ExamplePanel label="Input">
              <Input
                label="Question"
                name="design-question"
                placeholder="e.g., What does HTML stand for?"
              />
            </ExamplePanel>
            <ExamplePanel label="Input Error">
              <Input
                label="Question"
                name="design-question-error"
                placeholder="e.g., What does HTML stand for?"
                validationMessage="Please enter a question."
              />
            </ExamplePanel>
            <ExamplePanel label="Textarea">
              <TextArea
                label="Answer"
                name="design-answer"
                placeholder="e.g., HyperText Markup Language"
              />
            </ExamplePanel>
            <ExamplePanel label="Textarea Error">
              <TextArea
                label="Answer"
                name="design-answer-error"
                placeholder="e.g., HyperText Markup Language"
                validationMessage="Please enter an answer."
              />
            </ExamplePanel>
          </div>
        </Section>

        <Section title="Selection And Progress">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ExamplePanel label="Checkbox">
              <div className="flex flex-col gap-3">
                <Checkbox label="Hide mastered cards" name="hide-mastered" />
                <Checkbox
                  defaultChecked
                  label="Practice due cards only"
                  name="practice-due"
                />
                <Checkbox disabled label="Sync unavailable" name="sync" />
              </div>
            </ExamplePanel>
            <ExamplePanel label="Progress Bar">
              <div className="flex flex-col gap-4">
                {[0, 25, 50, 75, 100].map((value) => (
                  <div key={value} className="flex items-center gap-3">
                    <ProgressBar
                      value={value}
                      label={`Design system progress ${value}%`}
                    />
                    <span className="text-preset-6">{value}%</span>
                  </div>
                ))}
              </div>
            </ExamplePanel>
          </div>
        </Section>

        <Section title="Tabs">
          <div className="max-w-[680px]">
            <Tabs
              ariaLabel="Design system tab example"
              tabs={[
                {
                  value: "study",
                  label: "Study",
                  panel: "Review cards one at a time and reveal each answer when ready.",
                },
                {
                  value: "browse",
                  label: "Browse",
                  panel: "Scan every card in the current deck before starting a session.",
                },
                {
                  value: "stats",
                  label: "Stats",
                  panel: "Check progress, mastery, and cards that need another pass.",
                },
              ]}
            />
          </div>
        </Section>

        <Section title="Flashcards">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_348px]">
            <FlashcardContent
              answer="A reusable visual language keeps study flows predictable."
              category="Design System"
              progressValue={3}
              progressMax={5}
              question="Why document components?"
            />
            <Flashcard
              answer="Use the existing component API and text presets before creating one-off styles."
              category="Guidelines"
              mastered
              progressValue={5}
              progressMax={5}
              question="How should new screens stay consistent?"
            />
          </div>
        </Section>
      </div>
    </main>
  );
}
