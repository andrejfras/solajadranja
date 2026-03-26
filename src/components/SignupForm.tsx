"use client";

import { submitSignup } from "@/lib/actions";

const inputClass = "mt-1.5 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all";

export default function SignupForm({ courseSlug }: { courseSlug: string }) {
  return (
    <form action={submitSignup} className="space-y-5">
      <input type="hidden" name="course" value={courseSlug} />

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Ime in priimek <span className="text-red-500">*</span></span>
          <input type="text" name="fullName" required className={inputClass} />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Telefon <span className="text-red-500">*</span></span>
          <input type="tel" name="phone" required className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">E-pošta <span className="text-red-500">*</span></span>
        <input type="email" name="email" required className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Ulica in hišna številka</span>
        <input type="text" name="address" className={inputClass} />
      </label>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Poštna številka</span>
          <input type="text" name="postalCode" className={inputClass} />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Kraj</span>
          <input type="text" name="city" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Število tečajnikov <span className="text-red-500">*</span></span>
        <input type="number" name="participants" min={1} defaultValue={1} required className={inputClass + " max-w-[120px]"} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Opombe</span>
        <textarea name="notes" rows={3} className={inputClass + " resize-none"} />
      </label>

      <button
        type="submit"
        className="w-full mt-4 py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-ocean to-ocean-light border-none rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-ocean/25 hover:-translate-y-0.5 active:translate-y-0"
      >
        Pošlji prijavo
      </button>
    </form>
  );
}
