import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/SignupForm";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      dates: {
        where: { enabled: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!course) notFound();

  const program = (course.program as string[]) || [];
  const includes = (course.includes as string[]) || [];

  const availableDates = course.dates.filter((d) => d.spotsRemaining > 0);

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[45vh] min-h-[300px] flex items-end overflow-hidden">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            &larr; Nazaj na tečaje
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">{course.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <span className="bg-ocean-light/90 text-white font-bold px-4 py-1.5 rounded-full text-sm">
              {course.priceLabel}
            </span>
            {course.boat && (
              <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
                Plovilo: {course.boat}
              </span>
            )}
            {course.duration && (
              <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
                {course.duration}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{course.description}</p>

          {program.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-black text-navy mb-5">Program tečaja</h2>
              <div className="space-y-3">
                {program.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <span className="shrink-0 w-8 h-8 bg-ocean/10 text-ocean font-bold rounded-lg flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {course.note && (
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 mb-8">
              <p className="text-gray-700">
                {course.note}{" "}
                {course.relatedCourseSlug && (
                  <Link href={`/courses/${course.relatedCourseSlug}`} className="text-ocean font-semibold hover:underline">
                    Več o tečaju &rarr;
                  </Link>
                )}
              </p>
            </div>
          )}

          {includes.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-black text-navy mb-4">Cena vključuje</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available dates for this course */}
          {availableDates.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-black text-navy mb-4">Prosti termini</h2>
              <div className="space-y-3">
                {availableDates.map((d) => {
                  const filled = d.capacity - d.spotsRemaining;
                  const percent = Math.round((filled / d.capacity) * 100);
                  return (
                    <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{d.label}</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          percent >= 70
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {d.spotsRemaining} {d.spotsRemaining === 1 ? "prosto mesto" : "prostih mest"}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            percent >= 70 ? "bg-amber-400" : "bg-ocean-light"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Signup form with trust */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-12">
            <h2 className="text-2xl font-black text-navy mb-2">Prijavnica</h2>
            <p className="text-gray-500 text-sm mb-6">Izpolnite spodnji obrazec in javili se vam bomo v 24 urah.</p>

            <SignupForm courseSlug={slug} />

            {/* Trust elements near form */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Garancija na znanje</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>98% uspešnost</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Majhne skupine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
