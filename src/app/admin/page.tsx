import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { addCourseDate, updateCourseDate, deleteCourseDate, deleteSignup, adminLogout } from "@/lib/actions";

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      dates: { orderBy: { createdAt: "asc" } },
    },
  });

  const signups = await prisma.signup.findMany({
    orderBy: { createdAt: "desc" },
    include: { course: true },
    take: 50,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin panel</h1>
        <form action={adminLogout}>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
            Odjava
          </button>
        </form>
      </div>

      {/* ─── Course Dates Management ─── */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Razpisani termini tečajev</h2>

        {courses.map((course) => (
          <div key={course.id} className="border border-gray-300 p-4 mb-5 bg-white rounded">
            <h3 className="text-xl font-semibold mb-3">{course.name}</h3>

            {course.dates.length === 0 && (
              <p className="text-gray-500 text-sm">Ni razpisanih terminov.</p>
            )}

            {course.dates.map((d) => (
              <form key={d.id} action={updateCourseDate} className="flex flex-wrap gap-3 items-end border-t border-dashed border-gray-300 pt-3 mt-3">
                <input type="hidden" name="id" value={d.id} />

                <label className="flex-1 min-w-[150px]">
                  <span className="text-xs text-gray-500">Termin</span>
                  <input name="label" defaultValue={d.label} required className="w-full px-2 py-1 border rounded text-sm" />
                </label>

                <label className="w-24">
                  <span className="text-xs text-gray-500">Kapaciteta</span>
                  <input type="number" name="capacity" defaultValue={d.capacity} min={1} required className="w-full px-2 py-1 border rounded text-sm" />
                </label>

                <label className="w-24">
                  <span className="text-xs text-gray-500">Prosta</span>
                  <input type="number" name="spotsRemaining" defaultValue={d.spotsRemaining} min={0} required className="w-full px-2 py-1 border rounded text-sm" />
                </label>

                <button type="submit" className="px-3 py-1 bg-btn-blue text-white rounded text-sm hover:bg-btn-blue-dark">
                  Shrani
                </button>

                <form action={deleteCourseDate}>
                  <input type="hidden" name="id" value={d.id} />
                  <button type="submit" className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    Izbriši
                  </button>
                </form>
              </form>
            ))}
          </div>
        ))}
      </section>

      {/* ─── Add New Date ─── */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Dodaj nov termin</h2>

        <form action={addCourseDate} className="bg-white border border-gray-300 p-4 rounded space-y-3 max-w-md">
          <label className="block">
            <span className="text-sm font-medium">Tečaj</span>
            <select name="courseId" required className="w-full mt-1 px-3 py-2 border rounded">
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Termin</span>
            <input name="label" placeholder="npr. 12.–14. april 2025" required className="w-full mt-1 px-3 py-2 border rounded" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Kapaciteta (skupaj)</span>
            <input type="number" name="capacity" min={1} defaultValue={6} required className="w-full mt-1 px-3 py-2 border rounded" />
          </label>

          <button type="submit" className="w-full py-2 bg-navy text-white rounded font-semibold hover:bg-navy-light">
            Dodaj termin
          </button>
        </form>
      </section>

      {/* ─── Recent Signups ─── */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Zadnje prijave</h2>

        {signups.length === 0 ? (
          <p className="text-gray-500">Ni prijav.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Datum</th>
                  <th className="p-2 border">Tečaj</th>
                  <th className="p-2 border">Ime</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Telefon</th>
                  <th className="p-2 border">Št.</th>
                  <th className="p-2 border">Opombe</th>
                  <th className="p-2 border"></th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-2 border whitespace-nowrap">
                      {s.createdAt.toLocaleDateString("sl-SI")}
                    </td>
                    <td className="p-2 border">{s.course.name}</td>
                    <td className="p-2 border">{s.fullName}</td>
                    <td className="p-2 border">{s.email}</td>
                    <td className="p-2 border">{s.phone}</td>
                    <td className="p-2 border text-center">{s.participants}</td>
                    <td className="p-2 border text-gray-500">{s.notes || "—"}</td>
                    <td className="p-2 border">
                      <form action={deleteSignup}>
                        <input type="hidden" name="id" value={s.id} />
                        <button className="text-red-600 hover:underline text-xs">Izbriši</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
