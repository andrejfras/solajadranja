import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { deleteSignup } from "@/lib/actions";

export default async function AdminSignupsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const signups = await prisma.signup.findMany({
    orderBy: { createdAt: "desc" },
    include: { course: true, courseDate: true },
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prijave</h1>
            <p className="text-gray-500 text-sm mt-1">{signups.length} prijav skupaj</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {signups.length === 0 ? (
            <div className="px-5 py-16 text-center text-gray-400 text-sm">
              Ni prijav.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3 font-medium">Datum</th>
                    <th className="px-5 py-3 font-medium">Ime</th>
                    <th className="px-5 py-3 font-medium">Tečaj</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Telefon</th>
                    <th className="px-5 py-3 font-medium">Naslov</th>
                    <th className="px-5 py-3 font-medium text-center">Št.</th>
                    <th className="px-5 py-3 font-medium">Opombe</th>
                    <th className="px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {signups.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 group">
                      <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap text-xs">
                        {s.createdAt.toLocaleDateString("sl-SI")}
                        <br />
                        <span className="text-gray-300">{s.createdAt.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })}</span>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">{s.fullName}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                          {s.course.name}
                        </span>
                        {s.courseDate && (
                          <span className="block text-xs text-gray-400 mt-0.5">{s.courseDate.label}</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <a href={`mailto:${s.email}`} className="text-blue-600 hover:underline">{s.email}</a>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                        <a href={`tel:${s.phone}`} className="hover:text-gray-900">{s.phone}</a>
                      </td>
                      <td className="px-5 py-3.5 text-gray-400 text-xs max-w-[200px]">
                        {s.address ? (
                          <>
                            {s.address}
                            {s.postalCode || s.city ? (
                              <span className="block">{[s.postalCode, s.city].filter(Boolean).join(" ")}</span>
                            ) : null}
                          </>
                        ) : (
                          <span className="text-gray-300">&mdash;</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          s.participants > 1 ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-500"
                        }`}>
                          {s.participants}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-400 text-xs max-w-[200px]">
                        {s.notes || <span className="text-gray-300">&mdash;</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <form action={deleteSignup}>
                          <input type="hidden" name="id" value={s.id} />
                          <button className="text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            Izbriši
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
