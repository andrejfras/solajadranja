import Link from "next/link";

interface CourseWithDates {
  slug: string;
  name: string;
  dates: {
    id: string;
    label: string;
    capacity: number;
    spotsRemaining: number;
  }[];
}

export default function OccupancyBar({ courses }: { courses: CourseWithDates[] }) {
  if (!courses.length) {
    return (
      <p className="text-center text-slate-400 py-8 font-light">Trenutno ni razpisanih tečajev.</p>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {courses.map((course) => (
        <div key={course.slug} className="flex flex-col">
          <h3 className="text-2xl font-display text-navy border-b border-navy/10 pb-4 mb-6">{course.name}</h3>

          <div className="flex flex-col gap-3">
            {course.dates.map((d) => {
              const isFull = d.spotsRemaining === 0;
              const almostFull = d.spotsRemaining <= 2 && !isFull;

              return (
                <Link
                  key={d.id}
                  href={`/courses/${course.slug}`}
                  className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-md border transition-all duration-400 gap-4 no-underline ${
                    isFull
                      ? "bg-sand/50 border-transparent opacity-60 cursor-not-allowed pointer-events-none"
                      : "bg-white border-slate-100 hover:border-ocean/20 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-display text-xl text-navy">{d.label}</span>
                    {!isFull && (
                      <span className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase rounded-full border ${
                        almostFull 
                          ? "bg-coral/10 text-coral border-coral/20" 
                          : "bg-ocean/5 text-ocean border-ocean/10"
                      }`}>
                        {almostFull ? `Samo še ${d.spotsRemaining} ${d.spotsRemaining === 1 ? 'mesto' : 'mesti'}` : `${d.spotsRemaining} prostih mest`}
                      </span>
                    )}
                    {isFull && (
                      <span className="px-4 py-1.5 text-xs font-medium tracking-wider uppercase rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        Zasedeno
                      </span>
                    )}
                  </div>

                  {!isFull && (
                    <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100">
                      <span className="text-sm font-medium text-navy group-hover:text-coral transition-colors uppercase tracking-widest">
                        Rezerviraj
                      </span>
                      <span className="text-navy group-hover:text-coral group-hover:translate-x-1 transition-all duration-300">
                        &rarr;
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
