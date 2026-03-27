import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { PublicHeader, PublicFooter } from "@/components/PublicShell";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Navtični tečaji Izola — Od začetnika do samostojne plovbe",
  description: "Praktični tečaji jadranja, pristajanja in plovbe z gumenjakom v Izoli. 98% uspešnost, garancija na znanje, termini skozi vse leto. Tečaj + najem plovila na enem mestu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" className={`${outfit.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col font-sans bg-sand text-slate-800">
        <PublicHeader />
        <main className="flex-1">
          {children}
        </main>
        <PublicFooter />
      </body>
    </html>
  );
}
