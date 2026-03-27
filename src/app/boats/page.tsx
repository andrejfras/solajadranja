import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function BoatsPage() {
  const boats = await prisma.boat.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image src="/images/back.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy/80" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Najem plovil</h1>
          <p className="text-lg text-white/80">
            Po opravljenem tečaju ali z izkušnjami — izberite plovilo za vaš
            vikend na morju.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-navy border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-sm">Zavarovanje vključeno</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-sm">Gorivo vključeno</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-sm">Pomoč pri načrtovanju plovbe</span>
          </div>
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boats.map((boat, i) => (
              <div
                key={boat.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 animate-fade-in-up animate-delay-${i + 1}`}
              >
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    width={500}
                    height={240}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
                    {boat.priceLabel}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-navy mb-2">{boat.name}</h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm">{boat.specs}</span>
                  </div>
                  <Link
                    href="/contact"
                    className="block text-center w-full py-2.5 bg-ocean/10 text-ocean font-semibold text-sm rounded-xl hover:bg-ocean/20 transition-colors"
                  >
                    Povprašaj za najem
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Course connection */}
          <div className="mt-16 bg-gradient-to-br from-navy to-navy-light rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Še nimate izkušenj?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Opravite tečaj pri nas in si pridobite samozavest za prvi samostojen
              najem. Od učilnice do odprtega morja — vse na enem mestu.
            </p>
            <Link
              href="/#courses"
              className="inline-block px-8 py-4 bg-white text-navy font-bold text-lg rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Poglej tečaje
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
