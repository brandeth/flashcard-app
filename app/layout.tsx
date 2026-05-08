import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "./components/Navbar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flashcard App",
  description: "A Flashcard app built with Next.js 13 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full bg-brand-neutral-100 antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-neutral-100 text-brand-neutral-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
