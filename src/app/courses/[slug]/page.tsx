import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/SignupForm";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) notFound();

  const program = (course.program as string[]) || [];
  const includes = (course.includes as string[]) || [];

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

          {/* Signup form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-12">
            <h2 className="text-2xl font-black text-navy mb-6">Prijavnica</h2>
            <SignupForm courseSlug={slug} />
          </div>
        </div>
      </section>
    </>
  );
}
