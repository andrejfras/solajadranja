import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <Image src="/images/back.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy/80" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Kontakt</h1>
          <p className="text-lg text-white/80">Pišite nam ali nas pokličite</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-6">
            {/* Email */}
            <a
              href="mailto:info@solajadranja.si"
              className="group flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-ocean/20 transition-all"
            >
              <div className="w-14 h-14 bg-ocean/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-colors">
                <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Email</p>
                <p className="text-lg font-semibold text-navy">info@solajadranja.si</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+38600000000"
              className="group flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-ocean/20 transition-all"
            >
              <div className="w-14 h-14 bg-ocean/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-colors">
                <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Telefon</p>
                <p className="text-lg font-semibold text-navy">+386 XX XXX XXX</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-ocean/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Lokacija</p>
                <p className="text-lg font-semibold text-navy">Izola, Slovenija</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
