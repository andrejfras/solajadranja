import Link from "next/link";

export default function SignupSuccess() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-navy mb-3">Prijava uspešna!</h1>
        <p className="text-gray-500 text-lg mb-8">
          Hvala za vašo prijavo. Kontaktirali vas bomo v kratkem.
        </p>

        {/* Cross-sell */}
        <div className="bg-ocean/5 border border-ocean/10 rounded-2xl p-6 mb-8 text-left">
          <p className="text-sm font-bold text-navy mb-1">Naslednji korak?</p>
          <p className="text-gray-500 text-sm mb-3">
            Po opravljenem tečaju si lahko pri nas najamete plovilo za prvo samostojno plovbo.
          </p>
          <Link
            href="/boats"
            className="text-ocean font-semibold text-sm hover:underline"
          >
            Poglej plovila &rarr;
          </Link>
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-gradient-to-r from-ocean to-ocean-light text-white rounded-full text-lg font-bold no-underline hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
        >
          Nazaj na domačo stran
        </Link>
      </div>
    </section>
  );
}
