import { prisma } from "@/lib/db";
import CourseCard from "@/components/CourseCard";
import OccupancyBar from "@/components/OccupancyBar";
import Image from "next/image";

export default async function HomePage() {
  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const coursesWithDates = await prisma.course.findMany({
    where: { dates: { some: {} } },
    orderBy: { sortOrder: "asc" },
    include: {
      dates: {
        where: { enabled: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/back.jpg"
          alt="Jadransko morje"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
            Iz učilnice<br />
            <span className="text-amber-300">na odprto morje</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto leading-relaxed drop-shadow-lg">
            Praktični tečaji jadranja, pristajanja in plovbe z gumenjakom.
            Od začetnikov do regatnih jadralcev.
          </p>
          <a
            href="#courses"
            className="inline-block px-8 py-4 bg-ocean-light hover:bg-ocean text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Oglej si tečaje
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-navy mb-3">Praktični tečaji</h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Izberite tečaj, ki ustreza vašemu znanju in ciljem
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

      {/* Available dates */}
      {coursesWithDates.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-navy mb-3">Razpisani termini</h2>
              <p className="text-gray-500 text-lg">
                Pohitite s prijavo — mesta so omejena
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
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <Image
          src="/images/back.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Imate vprašanja?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Kontaktirajte nas za več informacij o tečajih, izletih ali najemu plovil.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-navy font-bold text-lg rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            Kontaktirajte nas
          </a>
        </div>
      </section>
    </>
  );
}
