import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { addTestimonial, updateTestimonial, toggleTestimonial, deleteTestimonial } from "@/lib/actions";

export default async function AdminTestimonialsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mnenja tečajnikov</h1>
          <p className="text-gray-500 text-sm mt-1">Upravljajte mnenja, ki se prikažejo na domači strani</p>
        </div>

        {/* Add form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Dodaj mnenje</h2>
          <form action={addTestimonial} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ime</span>
                <input
                  name="name"
                  placeholder="npr. Ana K."
                  required
                  className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Vloga / tečaj</span>
                <input
                  name="role"
                  placeholder="npr. Začetni tečaj jadranja"
                  required
                  className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Besedilo</span>
              <textarea
                name="text"
                rows={3}
                required
                placeholder="Mnenje tečajnika..."
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </label>

            <div className="flex gap-4 items-end">
              <label className="block w-24">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Zvezdice</span>
                <select
                  name="stars"
                  defaultValue={5}
                  className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                </select>
              </label>
              <label className="block w-20">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Vrstni red</span>
                <input
                  type="number"
                  name="sortOrder"
                  defaultValue={0}
                  className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <button
                type="submit"
                className="px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-light transition-colors"
              >
                Dodaj mnenje
              </button>
            </div>
          </form>
        </div>

        {/* Existing testimonials */}
        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-16 text-center text-gray-400 text-sm">
            Ni mnenj. Ko dodate mnenja, se bodo prikazala na domači strani.
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${!t.enabled ? "opacity-50" : ""}`}>
                <form action={updateTestimonial} className="p-5 space-y-4">
                  <input type="hidden" name="id" value={t.id} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-medium text-gray-400">Ime</span>
                      <input
                        name="name"
                        defaultValue={t.name}
                        required
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium text-gray-400">Vloga / tečaj</span>
                      <input
                        name="role"
                        defaultValue={t.role}
                        required
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs font-medium text-gray-400">Besedilo</span>
                    <textarea
                      name="text"
                      rows={2}
                      defaultValue={t.text}
                      required
                      className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                    />
                  </label>

                  <div className="flex items-end gap-4">
                    <label className="block w-24">
                      <span className="text-xs font-medium text-gray-400">Zvezdice</span>
                      <select
                        name="stars"
                        defaultValue={t.stars}
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                      </select>
                    </label>
                    <label className="block w-20">
                      <span className="text-xs font-medium text-gray-400">Red</span>
                      <input
                        type="number"
                        name="sortOrder"
                        defaultValue={t.sortOrder}
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Shrani
                    </button>
                  </div>
                </form>

                <div className="px-5 py-2 border-t border-gray-50 flex items-center gap-2">
                  <form action={toggleTestimonial}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="enabled" value={t.enabled ? "false" : "true"} />
                    <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      {t.enabled ? "Skrij" : "Prikaži"}
                    </button>
                  </form>
                  <span className="text-gray-200">|</span>
                  <form action={deleteTestimonial}>
                    <input type="hidden" name="id" value={t.id} />
                    <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
                      Izbriši
                    </button>
                  </form>
                  {t.enabled && (
                    <span className="ml-auto text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded">PRIKAZANO</span>
                  )}
                  {!t.enabled && (
                    <span className="ml-auto text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">SKRITO</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
