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
      <p className="text-center text-gray-400 py-8">Trenutno ni razpisanih tečajev.</p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {courses.map((course) => (
        <div
          key={course.slug}
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-navy to-navy-light px-6 py-4">
            <h3 className="text-white text-lg font-bold">{course.name}</h3>
          </div>

          <div className="p-4 space-y-3">
            {course.dates.map((d) => {
              const filled = d.capacity - d.spotsRemaining;
              const percent = Math.round((filled / d.capacity) * 100);
              const isFull = d.spotsRemaining === 0;

              return (
                <Link
                  key={d.id}
                  href={`/courses/${course.slug}`}
                  className={`block rounded-xl p-4 transition-all duration-300 no-underline ${
                    isFull
                      ? "bg-red-50 opacity-60 cursor-not-allowed pointer-events-none"
                      : "bg-gray-50 hover:bg-ocean/5 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">{d.label}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isFull
                        ? "bg-red-100 text-red-700"
                        : percent >= 70
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                    }`}>
                      {isFull ? "ZASEDENO" : `${d.spotsRemaining} prostih mest`}
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isFull ? "bg-red-500" : percent >= 70 ? "bg-amber-400" : "bg-ocean-light"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {filled} / {d.capacity} mest zasedenih
                    </span>
                    {!isFull && (
                      <span className="text-xs font-medium text-ocean">
                        Prijavi se &rarr;
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
