import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { addBoat, updateBoat, deleteBoat } from "@/lib/actions";
import Image from "next/image";

export default async function AdminBoatsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const boats = await prisma.boat.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plovila</h1>
          <p className="text-gray-500 text-sm mt-1">Upravljajte plovila za najem</p>
        </div>

        {/* Add boat form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Dodaj plovilo</h2>
          <form action={addBoat} className="flex flex-wrap gap-4 items-end">
            <label className="block flex-1 min-w-[160px]">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ime</span>
              <input
                name="name"
                placeholder="npr. Bavaria 34"
                required
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block flex-1 min-w-[160px]">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Slika (URL)</span>
              <input
                name="image"
                placeholder="/images/boat.jpg"
                required
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block w-32">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cena</span>
              <input
                name="priceLabel"
                placeholder="od 150 €"
                required
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block flex-1 min-w-[160px]">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Specifikacije</span>
              <input
                name="specs"
                placeholder="npr. 10.5m, 3 kabine, 6 oseb"
                required
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
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
              Dodaj plovilo
            </button>
          </form>
        </div>

        {/* Existing boats */}
        <div className="space-y-4">
          {boats.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-16 text-center text-gray-400 text-sm">
              Ni plovil v ponudbi.
            </div>
          ) : (
            boats.map((boat) => (
              <div key={boat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <form action={updateBoat} className="flex flex-col sm:flex-row">
                  <input type="hidden" name="id" value={boat.id} />

                  {/* Image preview */}
                  <div className="relative w-full sm:w-48 h-36 sm:h-auto shrink-0">
                    <Image
                      src={boat.image}
                      alt={boat.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Fields */}
                  <div className="flex-1 p-4 flex flex-wrap gap-3 items-end">
                    <label className="block flex-1 min-w-[140px]">
                      <span className="text-xs font-medium text-gray-400">Ime</span>
                      <input
                        name="name"
                        defaultValue={boat.name}
                        required
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block flex-1 min-w-[140px]">
                      <span className="text-xs font-medium text-gray-400">Slika (URL)</span>
                      <input
                        name="image"
                        defaultValue={boat.image}
                        required
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block w-28">
                      <span className="text-xs font-medium text-gray-400">Cena</span>
                      <input
                        name="priceLabel"
                        defaultValue={boat.priceLabel}
                        required
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block flex-1 min-w-[140px]">
                      <span className="text-xs font-medium text-gray-400">Specifikacije</span>
                      <input
                        name="specs"
                        defaultValue={boat.specs}
                        required
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block w-16">
                      <span className="text-xs font-medium text-gray-400">Red</span>
                      <input
                        type="number"
                        name="sortOrder"
                        defaultValue={boat.sortOrder}
                        className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                      >
                        Shrani
                      </button>
                    </div>
                  </div>
                </form>

                {/* Delete */}
                <div className="px-5 py-2 border-t border-gray-50 flex justify-end">
                  <form action={deleteBoat}>
                    <input type="hidden" name="id" value={boat.id} />
                    <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
                      Izbriši plovilo
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminShell>
  );
}
