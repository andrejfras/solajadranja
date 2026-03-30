import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stran ne obstaja",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-sand px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-display font-light text-navy mb-4">404</p>
        <h1 className="text-2xl font-display text-navy mb-3">Stran ne obstaja</h1>
        <p className="text-slate-500 text-sm font-light mb-8">
          Stran, ki jo iščete, ne obstaja ali je bila premaknjena.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-navy text-white text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-coral transition-colors"
        >
          Nazaj na domačo stran
        </Link>
      </div>
    </section>
  );
}
