import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { addCourseDate, updateCourseDate, deleteCourseDate, toggleCourseDate, setFeaturedDate, clearFeaturedDate } from "@/lib/actions";

export default async function AdminCoursesPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      dates: { orderBy: { createdAt: "asc" } },
      _count: { select: { signups: true } },
    },
  });

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tečaji & termini</h1>
          <p className="text-gray-500 text-sm mt-1">Upravljajte razpisane termine za vsak tečaj</p>
        </div>

        {/* Add new date form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Dodaj nov termin</h2>
          <form action={addCourseDate} className="flex flex-wrap gap-4 items-end">
            <label className="block flex-1 min-w-[200px]">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tečaj</span>
              <select name="courseId" required className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>

            <label className="block flex-1 min-w-[200px]">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Termin</span>
              <input
                name="label"
                placeholder="npr. 12.–14. april 2026"
                required
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block w-32">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Kapaciteta</span>
              <input
                type="number"
                name="capacity"
                min={1}
                defaultValue={6}
                required
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <button
              type="submit"
              className="px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-light transition-colors"
            >
              Dodaj termin
            </button>
          </form>
        </div>

        {/* Course list with dates */}
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Course header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{course.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {course.priceLabel} &middot; {course._count.signups} prijav skupaj &middot; {course.dates.length} terminov
                </p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded font-mono">
                {course.slug}
              </span>
            </div>

            {/* Dates */}
            {course.dates.length === 0 ? (
              <div className="px-5 py-8 text-center text-gray-400 text-sm">
                Ni razpisanih terminov za ta tečaj.
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {course.dates.map((d) => {
                  const filled = d.capacity - d.spotsRemaining;
                  const percent = d.capacity > 0 ? Math.round((filled / d.capacity) * 100) : 0;
                  const isFull = d.spotsRemaining === 0;

                  return (
                    <div key={d.id} className={`px-5 py-4 ${!d.enabled ? "opacity-50 bg-gray-50/50" : ""}`}>
                      <form action={updateCourseDate} className="flex flex-wrap gap-3 items-end">
                        <input type="hidden" name="id" value={d.id} />

                        <label className="flex-1 min-w-[180px]">
                          <span className="text-xs font-medium text-gray-400">Termin</span>
                          <input
                            name="label"
                            defaultValue={d.label}
                            required
                            className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          />
                        </label>

                        <label className="w-24">
                          <span className="text-xs font-medium text-gray-400">Kapaciteta</span>
                          <input
                            type="number"
                            name="capacity"
                            defaultValue={d.capacity}
                            min={1}
                            required
                            className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          />
                        </label>

                        <label className="w-24">
                          <span className="text-xs font-medium text-gray-400">Prosta</span>
                          <input
                            type="number"
                            name="spotsRemaining"
                            defaultValue={d.spotsRemaining}
                            min={0}
                            required
                            className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          />
                        </label>

                        {/* Occupancy indicator */}
                        <div className="w-28 pb-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold ${isFull ? "text-red-600" : percent >= 70 ? "text-amber-600" : "text-green-600"}`}>
                              {percent}%
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                              !d.enabled ? "bg-gray-100 text-gray-500" : isFull ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                            }`}>
                              {!d.enabled ? "SKRIT" : isFull ? "POLNO" : "AKTIVEN"}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isFull ? "bg-red-500" : percent >= 70 ? "bg-amber-400" : "bg-green-500"}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                          >
                            Shrani
                          </button>
                        </div>
                      </form>

                      {/* Secondary actions */}
                      <div className="flex items-center gap-2 mt-2">
                        {d.featured ? (
                          <form action={clearFeaturedDate}>
                            <button className="text-xs bg-coral/10 text-coral font-medium px-2 py-0.5 rounded transition-colors hover:bg-coral/20">
                              PRIKAZANO V ALERTU
                            </button>
                          </form>
                        ) : (
                          <form action={setFeaturedDate}>
                            <input type="hidden" name="id" value={d.id} />
                            <button className="text-xs text-gray-400 hover:text-coral transition-colors">
                              Nastavi kot alert
                            </button>
                          </form>
                        )}
                        <span className="text-gray-200">|</span>
                        <form action={toggleCourseDate}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="enabled" value={d.enabled ? "false" : "true"} />
                          <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            {d.enabled ? "Skrij termin" : "Prikaži termin"}
                          </button>
                        </form>
                        <span className="text-gray-200">|</span>
                        <form action={deleteCourseDate}>
                          <input type="hidden" name="id" value={d.id} />
                          <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
                            Izbriši
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
