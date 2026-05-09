import type { Metadata } from "next";
import { AllCardsList } from "../components/AllCardsList";
import { CreateCardForm } from "../components/CreateCardForm";

export const metadata: Metadata = {
  title: "All Cards | Flashcard App",
  description: "Create and manage flashcards.",
};

export default function AllCardsPage() {
  return (
    <main className="flex-1 bg-brand-neutral-100 px-5 pb-10 pt-4 text-brand-neutral-900 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <CreateCardForm />
        <AllCardsList />
      </div>
    </main>
  );
}
