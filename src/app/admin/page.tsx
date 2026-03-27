import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const [courses, signups, boats, courseDates] = await Promise.all([
    prisma.course.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.signup.findMany({
      orderBy: { createdAt: "desc" },
      include: { course: true },
      take: 5,
    }),
    prisma.boat.findMany(),
    prisma.courseDate.findMany({ where: { enabled: true } }),
  ]);

  const totalSignups = await prisma.signup.count();
  const thisMonthSignups = await prisma.signup.count({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  const totalSpots = courseDates.reduce((s, d) => s + d.capacity, 0);
  const takenSpots = courseDates.reduce((s, d) => s + (d.capacity - d.spotsRemaining), 0);
  const occupancyPercent = totalSpots > 0 ? Math.round((takenSpots / totalSpots) * 100) : 0;

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pregled</h1>
          <p className="text-gray-500 text-sm mt-1">Nadzorna plošča za upravljanje tečajev in prijav</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tečaji</span>
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
            <p className="text-xs text-gray-400 mt-1">{courseDates.length} aktivnih terminov</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Prijave skupaj</span>
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalSignups}</p>
            <p className="text-xs text-gray-400 mt-1">{thisMonthSignups} ta mesec</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Zasedenost</span>
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{occupancyPercent}%</p>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${occupancyPercent >= 80 ? "bg-red-500" : occupancyPercent >= 50 ? "bg-amber-400" : "bg-green-500"}`}
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{takenSpots} / {totalSpots} mest zasedenih</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Plovila</span>
              <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{boats.length}</p>
            <p className="text-xs text-gray-400 mt-1">v ponudbi</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Link
            href="/admin/courses"
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Upravljaj termine</p>
                <p className="text-xs text-gray-400">Dodaj, uredi ali izbriši termine tečajev</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/signups"
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Vse prijave</p>
                <p className="text-xs text-gray-400">Preglej in upravljaj prijave tečajnikov</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/boats"
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Upravljaj plovila</p>
                <p className="text-xs text-gray-400">Dodaj, uredi ali izbriši plovila</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent signups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Zadnje prijave</h2>
            <Link href="/admin/signups" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Vse prijave &rarr;
            </Link>
          </div>

          {signups.length === 0 ? (
            <div className="px-5 py-10 text-center text-gray-400 text-sm">
              Ni prijav.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-5 py-3 font-medium">Ime</th>
                    <th className="px-5 py-3 font-medium">Tečaj</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Telefon</th>
                    <th className="px-5 py-3 font-medium">Datum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {signups.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{s.fullName}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                          {s.course.name}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{s.email}</td>
                      <td className="px-5 py-3 text-gray-500">{s.phone}</td>
                      <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                        {s.createdAt.toLocaleDateString("sl-SI")}
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
