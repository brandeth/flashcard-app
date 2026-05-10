import { StudyDashboard } from "./components/StudyDashboard";

export default function Home() {
  return (
    <main className="flex-1 bg-brand-neutral-100 px-5 pb-10 pt-4 text-brand-neutral-900 sm:px-8 lg:px-10">
      <StudyDashboard />
    </main>
  );
}
