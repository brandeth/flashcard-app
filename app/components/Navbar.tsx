import Image from "next/image";
import Link from "next/link";
import { NavTabs } from "./NavTabs";

export function Navbar() {
  return (
    <header className="w-full bg-brand-neutral-100 px-5 py-4 text-brand-neutral-900 sm:px-8 lg:px-10">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 sm:flex-nowrap"
      >
        <Link
          href="/"
          aria-label="Flashcard home"
          className="inline-flex shrink-0 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-600"
        >
          <Image
            src="/assets/logo-with-text.svg"
            alt="Flashcard"
            width={157}
            height={40}
            priority
            className="h-10 w-[157px]"
          />
        </Link>

        <NavTabs />
      </nav>
    </header>
  );
}
