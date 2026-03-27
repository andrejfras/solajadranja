"use client";

import { useState } from "react";
import { submitSignup } from "@/lib/actions";

const inputClass = "mt-1.5 w-full px-4 py-3 bg-white border border-slate-200 rounded-sm text-base focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all shadow-sm font-light";

export default function SignupForm({ courseSlug }: { courseSlug: string }) {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <form action={submitSignup} className="space-y-6">
      <input type="hidden" name="course" value={courseSlug} />

      {/* Essential fields only */}
      <div className="grid sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-sm font-medium text-navy">Ime in priimek <span className="text-coral">*</span></span>
          <input type="text" name="fullName" required className={inputClass} placeholder="Janez Novak" />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-navy">Telefon <span className="text-coral">*</span></span>
          <input type="tel" name="phone" required className={inputClass} placeholder="+386 XX XXX XXX" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-navy">E-pošta <span className="text-coral">*</span></span>
        <input type="email" name="email" required className={inputClass} placeholder="janez@email.com" />
      </label>

      <div className="grid sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-sm font-medium text-navy">Število tečajnikov <span className="text-coral">*</span></span>
          <input type="number" name="participants" min={1} defaultValue={1} required className={inputClass + " max-w-[120px]"} />
        </label>
      </div>

      {/* Toggle for optional fields */}
      {!showExtra && (
        <button
          type="button"
          onClick={() => setShowExtra(true)}
          className="text-sm text-slate-500 hover:text-navy font-medium transition-colors mt-2 underline underline-offset-4"
        >
          + Dodaj naslov in opombe (neobvezno)
        </button>
      )}

      {showExtra && (
        <div className="space-y-6 pt-6 border-t border-slate-100 animate-fade-in-up mt-6">
          <label className="block">
            <span className="text-sm font-medium text-navy">Ulica in hišna številka</span>
            <input type="text" name="address" className={inputClass} />
          </label>

          <div className="grid sm:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-sm font-medium text-navy">Poštna številka</span>
              <input type="text" name="postalCode" className={inputClass} />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-navy">Kraj</span>
              <input type="text" name="city" className={inputClass} />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-navy">Opombe</span>
            <textarea name="notes" rows={3} className={inputClass + " resize-none"} placeholder="Posebne želje, vprašanja..." />
          </label>
        </div>
      )}

      <button
        type="submit"
        className="w-full mt-6 py-4 px-6 text-lg font-medium text-white bg-coral hover:bg-coral-dark border-none rounded-sm transition-all duration-400 hover:shadow-xl hover:-translate-y-1 tracking-widest uppercase"
      >
        Rezerviraj mesto
      </button>

      {/* Trust Anchors */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 opacity-70">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="text-xs font-medium text-navy uppercase tracking-wider">Plačilo na predlogi</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <span className="text-xs font-medium text-navy uppercase tracking-wider">Varna prijava</span>
        </div>
      </div>
    </form>
  );
}
