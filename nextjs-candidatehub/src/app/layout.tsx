import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CandidateHub | The AI Operating System for Talent",
  description: "CandidateHub is the AI Operating System for Talent. Manage talent from hire to retire with Markis, your AI teammate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
