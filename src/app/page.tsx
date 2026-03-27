import { prisma } from "@/lib/db";
import CourseCard from "@/components/CourseCard";
import OccupancyBar from "@/components/OccupancyBar";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const coursesWithDates = await prisma.course.findMany({
    where: { dates: { some: {} } },
    orderBy: { sortOrder: "asc" },
    include: {
      dates: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const boats = await prisma.boat.findMany({
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  const featuredDate = await prisma.courseDate.findFirst({
    where: { spotsRemaining: { gt: 0 } },
    orderBy: { createdAt: "asc" },
    include: { course: true },
  });

  return (
    <>
      {/* ═══ HERO — transformation-focused ═══ */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Jadransko morje"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy/90" />
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up">
          <p className="text-white/80 text-sm sm:text-sm font-medium tracking-[0.2em] uppercase mb-6">
            Navtična Akademija Izola
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-light text-white mb-8 leading-[1.15] drop-shadow-xl">
            Od začetnika do<br />
            <span className="font-serif italic text-coral">samostojne plovbe</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
            Najhitrejša pot od nič do samozavestnega skiperja. Praktični tečaji na morju, 
            kjer jadranje postane življenjski slog in morje vaš drugi dom.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#dates"
              className="inline-flex justify-center items-center px-10 py-4 bg-coral hover:bg-coral-dark text-white font-medium text-lg rounded-md shadow-2xl hover:shadow-coral/20 hover:-translate-y-1 transition-all duration-400"
            >
              Rezerviraj svoje mesto
            </a>
            <a
              href="#courses"
              className="inline-flex justify-center items-center px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-lg rounded-md backdrop-blur-md border border-white/30 hover:-translate-y-1 transition-all duration-400"
            >
              Razišči tečaje
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══ NEXT AVAILABLE COURSE WIDGET ═══ */}
      {featuredDate && featuredDate.spotsRemaining > 0 && (
        <div className="bg-coral text-white py-4 px-4 sm:px-6 relative z-30 shadow-2xl flex items-center justify-center">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4 md:gap-8 justify-center min-h-[40px]">
            <div className="flex items-center gap-3 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="font-display uppercase tracking-widest text-xs font-bold">Naslednji prosti termin</span>
            </div>
            <p className="font-light text-sm text-center">
              {featuredDate.course.name} • <span className="font-medium mr-1">{featuredDate.label}</span>
              <span className="bg-white text-coral text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ml-2 align-middle shadow-sm">
                {featuredDate.spotsRemaining === 1
                  ? "Samo še 1 mesto"
                  : featuredDate.spotsRemaining === 2
                    ? "Samo še 2 mesti"
                    : featuredDate.spotsRemaining <= 4
                      ? `Samo še ${featuredDate.spotsRemaining} mesta`
                      : `${featuredDate.spotsRemaining} prostih mest`}
              </span>
            </p>
            <a href="#dates" className="hidden sm:inline-flex bg-white/20 hover:bg-white text-white hover:text-coral px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors border border-white/30 shrink-0">
              Rezerviraj
            </a>
          </div>
        </div>
      )}

      {/* ═══ TRUST STRIP ═══ */}
      <section className="bg-navy border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div>
            <p className="text-3xl sm:text-4xl font-display font-light text-white">98%</p>
            <p className="text-white/60 text-xs tracking-wider uppercase mt-2">Uspešnost izpitov</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-display font-light text-white">250+</p>
            <p className="text-white/60 text-xs tracking-wider uppercase mt-2">Preverjenih mnenj</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-display font-light text-white">365</p>
            <p className="text-white/60 text-xs tracking-wider uppercase mt-2">Dni na leto na vodi</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl sm:text-4xl font-display font-light text-white">100%</p>
            </div>
            <p className="text-white/60 text-xs tracking-wider uppercase mt-2">Garancija na znanje</p>
          </div>
        </div>
      </section>

      {/* ═══ THREE INTENT PATHS ═══ */}
      <section className="py-24 px-4 sm:px-6 bg-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Vaša naslednja izkušnja</h2>
            <p className="text-slate-500 text-lg font-light">Izberite svojo pot do popolnega oddiha na morju</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Path 1: License */}
            <a href="#courses" className="group block bg-white rounded-xl p-10 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-14 h-14 bg-sand rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-coral/10 transition-all duration-500">
                <svg className="w-6 h-6 text-navy group-hover:text-coral transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-navy mb-3">Osvojite znanje</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">Praktični tečaji od osnov do regatnega jadranja. Na pravi jadrnici, pod vodstvom izkušenih kapitanov.</p>
              <span className="inline-flex items-center text-navy font-medium text-sm group-hover:text-coral transition-colors uppercase tracking-widest">
                Poglej tečaje <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </a>

            {/* Path 2: Experience */}
            <Link href="/izleti" className="group block bg-white rounded-xl p-10 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-14 h-14 bg-sand rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-coral/10 transition-all duration-500">
                <svg className="w-6 h-6 text-navy group-hover:text-coral transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-navy mb-3">Doživite morje</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">Jadralski izleti po meri za nezabne trenutke z družino ali romantičen pobeg v dvoje. Vi se sprostite, mi poskrbimo za plovbo.</p>
              <span className="inline-flex items-center text-navy font-medium text-sm group-hover:text-coral transition-colors uppercase tracking-widest">
                Poglej izlete <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>

            {/* Path 3: Rental */}
            <Link href="/boats" className="group block bg-white rounded-xl p-10 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-14 h-14 bg-sand rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-coral/10 transition-all duration-500">
                <svg className="w-6 h-6 text-navy group-hover:text-coral transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-navy mb-3">Najemite plovilo</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">Vrhunske jadrnice in gumenjaki za vaš naslednji vikend pobeg. Vaša svoboda čaka.</p>
              <span className="inline-flex items-center text-navy font-medium text-sm group-hover:text-coral transition-colors uppercase tracking-widest">
                Pregled flote <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ COURSES ═══ */}
      <section id="courses" className="py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Naši programi in tečaji</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto font-light">
              Izberite tečaj, ki ustreza vašemu predznanju — od prvih korakov na jadrnici do povsem samostojne plovbe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c, i) => (
              <CourseCard
                key={c.slug}
                slug={c.slug}
                name={c.name}
                shortDescription={c.shortDescription}
                image={c.image}
                priceLabel={c.priceLabel}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY LADDER ═══ */}
      <section className="py-32 px-4 sm:px-6 bg-sand">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Vaša pot do morja</h2>
            <p className="text-slate-500 text-lg font-light">Od prvega koraka do samostojne plovbe</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ocean/20 md:-translate-x-px" />

            {[
              { step: "1", title: "Izberite tečaj", desc: "Začetni, nadaljevalni ali regatni — prilagojeno vašemu znanju.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
              { step: "2", title: "Učite se na morju", desc: "Praktični tečaj na pravi jadrnici ali motornem čolnu v Izoli.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
              { step: "3", title: "Utrdite samozavest", desc: "Dodatne praktične ure, manevriranje in pristajalske vaje.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { step: "4", title: "Na morje!", desc: "Najemite plovilo pri nas ali odplujte po Hrvaški obali. Vi ste kapitan.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-start gap-6 mb-10 last:mb-0 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Step circle */}
                <div className="relative z-10 shrink-0 w-12 h-12 bg-ocean text-white font-black text-lg rounded-full flex items-center justify-center shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                  {item.step}
                </div>
                {/* Content */}
                <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1 ml-0 md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:ml-0 md:pr-12" : "md:ml-auto md:mr-0 md:pl-12"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-32 px-4 sm:px-6 bg-navy text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-light mb-4">Kateri tečaj je pravi za vas?</h2>
            <p className="text-white/60 text-lg font-light">Primerjajte programe in izberite pravo pot do samostojne plovbe.</p>
          </div>
          
          <div className="overflow-x-auto pb-4 pt-8">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 font-display text-xl font-light text-white/50 w-1/3">Značilnost</th>
                  <th className="py-6 px-4 font-display text-xl font-medium text-white w-1/3 border-l border-white/10">Začetni tečaj</th>
                  <th className="pt-8 pb-6 px-4 font-display text-xl font-medium text-coral w-1/3 border-l border-white/10 relative">
                    <span className="absolute top-0 left-4 bg-coral text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm whitespace-nowrap shadow-lg">Najbolj priljubljen</span>
                    Nadaljevalni tečaj
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-white/80">
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-white/50">Predznanje</td>
                  <td className="py-4 px-4 border-l border-white/10">Ni potrebno</td>
                  <td className="py-4 px-4 border-l border-white/10">Opravljen začetni tečaj oz. osnove</td>
                </tr>
                <tr className="border-b border-white/5 bg-white/5">
                  <td className="py-4 px-4 text-white/50">Glavni cilj</td>
                  <td className="py-4 px-4 border-l border-white/10">Osnove jadranja in varnosti</td>
                  <td className="py-4 px-4 border-l border-white/10">Samostojno upravljanje in manevriranje</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-white/50">Poudarek na pristajanju</td>
                  <td className="py-4 px-4 border-l border-white/10">Osnove (manjši del tečaja)</td>
                  <td className="py-4 px-4 border-l border-white/10 text-coral font-medium">Intenzivno (večina tečaja)</td>
                </tr>
                <tr className="border-b border-white/5 bg-white/5">
                  <td className="py-4 px-4 text-white/50">Samostojen najem barke</td>
                  <td className="py-4 px-4 border-l border-white/10">Še ne</td>
                  <td className="py-4 px-4 border-l border-white/10 font-medium text-white">Da, priporočeno!</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 text-white/50"></td>
                  <td className="py-6 px-4 border-l border-white/10">
                    <a href="#dates" className="text-white uppercase tracking-widest text-xs font-medium hover:text-coral transition-colors">Poglej termine &rarr;</a>
                  </td>
                  <td className="py-6 px-4 border-l border-white/10">
                    <a href="#dates" className="text-coral uppercase tracking-widest text-xs font-medium hover:text-white transition-colors">Poglej termine &rarr;</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ AVAILABLE DATES with urgency ═══ */}
      {coursesWithDates.length > 0 && (
        <section id="dates" className="py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Prihajajoči termini</h2>
              <p className="text-slate-500 text-lg font-light">
                Število mest na plovilu je omejeno. Rezervirajte svoje pravočasno.
              </p>
            </div>

            <OccupancyBar
              courses={coursesWithDates.map((c) => ({
                slug: c.slug,
                name: c.name,
                dates: c.dates.map((d) => ({
                  id: d.id,
                  label: d.label,
                  capacity: d.capacity,
                  spotsRemaining: d.spotsRemaining,
                })),
              }))}
            />

            <div className="text-center mt-10">
              <a
                href="#courses"
                className="inline-block px-8 py-4 bg-ocean-light hover:bg-ocean text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Rezerviraj termin
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ═══ INSTRUCTOR PROFILES ═══ */}
      <section className="py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Spoznajte ekipo</h2>
            <p className="text-slate-500 text-lg font-light">Skupaj imamo več kot 20.000 preplutih milj. Vaša varnost je v zanesljivih rokah.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-sand shadow-lg transition-all duration-500">
                <div className="absolute inset-0 bg-slate-200" /> {/* Placeholder fallback */}
                <Image src="/images/Instructor_andrej_f.png" alt="Andrej F." fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-2xl font-display text-navy mb-1">Andrej F.</h3>
              <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">Glavni inštruktor</p>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Nekdanji regatni jadralec in strasten pedagog. Andrej uči z mirnostjo, ki tudi najbolj plašnim začetnikom vlije popolno samozavest.
              </p>
            </div>
            <div className="group text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-sand shadow-lg transition-all duration-500">
                <div className="absolute inset-0 bg-slate-200" /> {/* Placeholder fallback */}
                <Image src="/images/docking.jpg" alt="Ana" fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-2xl font-display text-navy mb-1">Ana P.</h3>
              <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">Inštruktorica jadranja</p>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Specialistka za družinska jadranja in manevriranje na morju. Njene nasvete za pristajanje v močnem vetru boste še dolgo pomnili.
              </p>
            </div>
            <div className="group text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-sand shadow-lg transition-all duration-500">
                <div className="absolute inset-0 bg-slate-200" /> {/* Placeholder fallback */}
                <Image src="/images/vsr.jpg" alt="Luka" fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-2xl font-display text-navy mb-1">Luka M.</h3>
              <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">Vodja flote</p>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Tečaj plovbe z gumenjakom pod njegovim okriljem je dinamičen, varen in poln profesionalnih trikov za preživetje v nabito polnih marinah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-32 px-4 sm:px-6 bg-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Izkustva naših tečajnikov</h2>
            <p className="text-slate-500 text-lg font-light">Njihove zgodbe so najboljši dokaz naše kakovosti</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ana K.",
                text: "Kot popolna začetnica sem bila nervozna, ampak inštruktorji so fantastični. Po tečaju sem se počutila samozavestno na morju. Priporočam vsakemu!",
                role: "Tečaj jadranja za začetnike",
              },
              {
                name: "Marko P.",
                text: "Super organizacija, praktičen pristop in odlična ekipa. Po dveh tečajih smo z družino najeli jadrnico in odpluli po Hrvaški. Nepozabno!",
                role: "Nadaljevalni tečaj + najem plovila",
              },
              {
                name: "Tina & Luka",
                text: "Izlet za obletnico je bil boljši od pričakovanj. Skiper je bil pozoren, morje čudovito. Zdaj razmišljava o tečaju — da bova naslednjič sama na krovu.",
                role: "Jadralski izlet po meri",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-navy text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RENTAL OUTCOME BLOCK ═══ */}
      {boats.length > 0 && (
        <section className="py-32 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Vas mika samostojna plovba?</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">
                Pri nas se vaša pot ne konča s tečajem. Najemite vrhunsko plovilo iz naše flote in odplujte novim ciljem naproti.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {boats.map((boat) => (
                <div key={boat.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={boat.image}
                      alt={boat.name}
                      width={500}
                      height={200}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1 rounded-full shadow">
                      {boat.priceLabel}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-navy">{boat.name}</h3>
                    <p className="text-gray-500 text-sm">{boat.specs}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/boats"
                className="inline-block px-8 py-4 bg-ocean-light hover:bg-ocean text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Poglej vsa plovila
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ GIFT CARDS ═══ */}
      <section className="py-32 px-4 sm:px-6 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ocean/10 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-white mb-6">Podarite nepozabno izkušnjo</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
              Iščete pravo darilo? Presenetite svoje najdražje z darilnim bonom za tečaj jadranja ali plovbo z gumenjakom ob Slovenski obali.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white/80 font-light text-sm sm:text-base">
                <svg className="w-5 h-5 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Veljavnost bona celo leto (12 mesecev)
              </li>
              <li className="flex items-center gap-3 text-white/80 font-light text-sm sm:text-base">
                <svg className="w-5 h-5 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Eleganten tisk v vrhunski darilni embalaži
              </li>
              <li className="flex items-center gap-3 text-white/80 font-light text-sm sm:text-base">
                <svg className="w-5 h-5 text-coral shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Možnost prilagoditve paketov (pari, družine)
              </li>
            </ul>
            <a href="/contact" className="inline-flex justify-center items-center px-8 py-4 border border-coral text-coral hover:bg-coral hover:text-white font-medium text-sm uppercase tracking-widest rounded-sm transition-colors duration-400">
              Naroči darilni bon
            </a>
          </div>
          <div className="md:w-1/2 relative h-[350px] w-full rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
            <div className="absolute inset-0 bg-navy/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 bg-slate-800" /> {/* Placeholder fallback */}
            <Image src="/images/voucher.png" alt="Darilni bon za jadranje" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ═══ FAQs ═══ */}
      <section className="py-32 px-4 sm:px-6 bg-sand border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-light text-navy mb-4">Pogosta vprašanja</h2>
            <p className="text-slate-500 text-lg font-light">
              Vse, kar morate vedeti pred prvo plovbo.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Ali potrebujem predznanje za začetni tečaj?", a: "Ne. Začetni tečaj je zasnovan za popolne začetnike. Naučili vas bomo vsega, od osnovnih vozlov do prvega upravljanja jadrnice na odprtem morju." },
              { q: "Kaj moram prinesti s seboj na tečaj?", a: "Priporočamo udobna športna oblačila, vetrovko, sončna očala in kremo za sončenje. Obutev naj bo športna, z nedrsečim in svetlim podplatom (ki ne pušča sledi na belem palubju)." },
              { q: "Kaj se zgodi v primeru slabega vremena?", a: "Varnost je vedno na prvem mestu. Če je vremenska napoved prenevarna (močan veter, nevihte, visoki valovi), tečaj v dogovoru z vami prestavimo na naslednji varen termin." },
              { q: "Ali lahko po opravljenem tečaju pri vas samostojno najamem barko?", a: "Da! Če imate opravljen izpit za voditelja čolna in ste pri nas uspešno zaključili nadaljevalni tečaj, imate dovolj znanja za samostojen najem jadrnice iz naše flote." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-100 shadow-sm rounded-md p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-coral/30 transition-colors">
                <summary className="flex items-center justify-between font-display text-xl text-navy">
                  <span>{faq.q}</span>
                  <span className="text-coral group-open:rotate-180 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <p className="mt-4 text-slate-500 font-light leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RISK REVERSAL + FINAL CTA ═══ */}
      <section className="relative py-32 px-4 overflow-hidden">
        <Image
          src="/images/back.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/90" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-display font-light text-white mb-6">
            Pripravljeni na nov začetek?
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto font-light">
            Od prvega morskega vozla do samostojnega upravljanja jadrnice. 
            Tečaj, oprema in najem plovila — vse vas že čaka.
          </p>

          {/* Risk reversal badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10">
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-white text-sm font-medium">Garancija na znanje</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10">
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm font-medium">Termini skozi vse leto</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10">
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white text-sm font-medium">Majhne skupine</span>
            </div>
          </div>

          <a
            href="#dates"
            className="inline-flex justify-center items-center px-12 py-5 bg-coral hover:bg-coral-dark text-white font-medium text-xl rounded-md shadow-2xl hover:-translate-y-1 transition-all duration-400"
          >
            Rezerviraj svoj termin
          </a>
        </div>
      </section>
    </>
  );
}
