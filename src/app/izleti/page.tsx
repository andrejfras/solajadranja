import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadralski izleti po meri",
  description: "Jadralski izleti prilagojeni vašim željam. Za pare, družine ali ekipe. Skiper, gorivo in zavarovanje vključeno.",
  alternates: { canonical: "https://navticni-tecaj.si/izleti" },
  openGraph: {
    title: "Jadralski izleti po meri — Navtični tečaji Izola",
    description: "Jadralski izleti prilagojeni vašim željam. Za pare, družine ali ekipe.",
    url: "https://navticni-tecaj.si/izleti",
  },
};

export default function IzletiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domov", item: "https://navticni-tecaj.si" },
          { "@type": "ListItem", position: 2, name: "Jadralski izleti", item: "https://navticni-tecaj.si/izleti" },
        ],
      }) }} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image src="/images/back.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy/80" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Jadralski izleti po meri</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Doživetja, ki jih prilagodimo vašim željam, času in izkušnjam. Vsak izlet je drugačen.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">

          {/* Customizable */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-navy mb-6">Izlet prilagodimo glede na:</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Trajanje (2 ure, 4 ure, cel dan)" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", text: "Lokacijo na Slovenski obali" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Število oseb" },
                { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", text: "Želje po aktivnostih" },
                { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", text: "Raven vašega predznanja" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <svg className="w-5 h-5 text-ocean shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Boat types */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-navy mb-6">Na voljo več vrst plovil</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-ocean/5 to-ocean/10 rounded-2xl p-6 border border-ocean/10">
                <h3 className="text-xl font-bold text-navy mb-2">Jadrnice</h3>
                <p className="text-gray-600">Idealne za sproščeno jadranje, učenje osnov in druženje na morju.</p>
              </div>
              <div className="bg-gradient-to-br from-ocean/5 to-ocean/10 rounded-2xl p-6 border border-ocean/10">
                <h3 className="text-xl font-bold text-navy mb-2">Motorni čolni</h3>
                <p className="text-gray-600">Primerni za hitrejše izlete, kopanje v zalivih in krajše avanture.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Načrtujte svoj izlet</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Pošljite nam povpraševanje in skupaj bomo pripravili predlog izleta.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-navy font-bold text-lg rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Pošlji povpraševanje
            </Link>
          </div>

          {/* Includes */}
          <div className="mt-12 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-green-50 rounded-full px-5 py-2.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Najem plovila, gorivo in zavarovanje</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-full px-5 py-2.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Skiper / inštruktor</span>
            </div>
          </div>

          {/* Cross-sell to courses */}
          <div className="mt-12 bg-ocean/5 border border-ocean/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-navy mb-2">Želite na morje sami?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Opravite tečaj jadranja ali plovbe z gumenjakom in naslednjič izplujte samostojno.
            </p>
            <Link
              href="/#courses"
              className="inline-block px-6 py-3 bg-ocean-light hover:bg-ocean text-white font-bold text-sm rounded-full transition-all duration-300"
            >
              Poglej tečaje
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
