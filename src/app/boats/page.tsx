import { prisma } from "@/lib/db";
import Image from "next/image";

export default async function BoatsPage() {
  const boats = await prisma.boat.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <Image src="/images/back.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy/80" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Najem plovil</h1>
          <p className="text-lg text-white/80">Izberite plovilo za vaše naslednje doživetje na morju</p>
        </div>
      </section>

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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
                    {boat.priceLabel}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-navy mb-2">{boat.name}</h3>
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm">{boat.specs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
