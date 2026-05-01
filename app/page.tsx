export default function Home() {
  return (
    <main className="min-h-screen bg-brand-neutral-900 p-8 text-white">
      <section className="rounded-lg bg-white p-6 text-brand-neutral-900">
        <h1 className="text-3xl font-bold">Flashcards</h1>

        <button className="mt-6 rounded-md bg-brand-yellow-500 px-4 py-2 font-semibold text-brand-neutral-900 hover:bg-brand-pink-500">
          Create Card
        </button>
      </section>
    </main>
  );
}
