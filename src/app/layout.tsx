import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const roboto = Roboto_Condensed({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Navtični tečaji Izola",
  description: "Praktični tečaji jadranja, pristajanja in plovbe z gumenjakom v Izoli.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" className={roboto.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-navy text-white/80 text-center py-6 text-sm tracking-wide">
          <p>&copy; 2025 Navtični tečaji Izola. Vse pravice pridržane.</p>
        </footer>
      </body>
    </html>
  );
}
